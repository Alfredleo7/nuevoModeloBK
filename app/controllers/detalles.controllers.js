'use strict';

var mongoose = require('mongoose');
var Detalle = mongoose.model('Detalle');
var Proveedor = mongoose.model('Proveedor');
var Caja = mongoose.model('Caja');
var Usuario = mongoose.model('Usuario');

var getErrorMessage = function(err){
  if (err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.create = function(req, res){
  var detalle = new Detalle(req.body);
  detalle.creador = req.session.usuario.id;
  detalle.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Caja.findById(detalle.caja,function(err, caja){
        if (err) {
          return res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          caja.valor = Number(caja.valor) + Number(detalle.valor);
          caja.save(function(err){
            if(err){
              return res.status(500).send({
                message: getErrorMessage(err)
              })
            } else {
              res.status(200).send(detalle);
            }
          })
        }
      })
    }
  });
};

exports.list = function(req, res){
  Detalle.find({}, function(err, detalles){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(detalles);
    }
  });
};

exports.read = function(req, res){
  res.json(req.detalle);
};

exports.update = function(req, res){
  var detalle = req.detalle;

  Caja.findById(detalle.caja,function(err, caja){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      caja.valor = Number(caja.valor) - Number(detalle.valor);
      caja.valor = Number(caja.valor) + Number(req.body.valor);
      caja.save(function(err){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          })
        } else {

          detalle.valor = Number(req.body.valor);
          detalle.categoria = req.body.categoria;
          detalle.entregado = req.body.entregado;
          detalle.cargado = req.body.cargado;
          detalle.fecha = req.body.fecha;
          detalle.descripcion = req.body.descripcion;
          detalle.tipo = req.body.tipo;
          detalle.anexo = req.body.anexo;

          detalle.save(function(err){
            if (err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            } else {
              res.json(detalle);
            }
          });
        }
      })
    }
  })
};

exports.delete = function(req, res){
  var detalle = req.detalle;

  detalle.remove(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Caja.findById(detalle.caja,function(err, caja){
        if (err) {
          return res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          caja.valor = Number(caja.valor) - Number(detalle.valor);
          caja.save(function(err){
            if(err){
              return res.status(500).send({
                message: getErrorMessage(err)
              })
            } else {
              res.status(200).send(detalle);
            }
          })
        }
      })
    }
  });
};

exports.detalleByID = function(req, res, next, id){
  Detalle.findById(id, function(err, detalle){
    if (err) return next(err);
    if (!detalle){
      return res.status(404).send({
        message: 'No existe el detalle'
      })
    }
    req.detalle = detalle;
    next();
  });
};

exports.listByCaja = function(req, res) {
  var idCaja = req.params.idCaja;
  Detalle.find({'caja': idCaja}, function(err, detalles){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      //Proveedor.populate(detalles, {path: 'anexo.proveedor'}, function(err, detalles){
        res.status(200).send(detalles);
      //});
    }
  });
};

exports.deleteByCaja = function(req, res) {
  var idCaja = req.params.idCaja;
  Detalle.find({'caja': idCaja}, function(err, detalles){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      for(var i in detalles){
        detalles[i].remove();
      }
      return res.status(200).send({
        message: 'Todos los detalles de ésta caja han sido eliminados'
      })
    }
  });
};

exports.reporteXSucursal = function(req, res) {
  if(req.body.categoria == 'Todas'){
    Detalle.aggregate(
      [
        { $project: {
            cargado: "$cargado",
            categoria: "$categoria",
            mes: { $month: "$fecha"},
            anio: { $year: "$fecha" },
            valor: "$valor",
            estado: "$estado"
          }
        },
        { $match: {
            anio: {
              $eq: Number(req.body.anio)
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        },
        { $group: {
            _id: {
              sucursal: "$cargado",
              mes: "$mes"
            },
            total: {
              $sum: "$valor"
            }
          }
        },
        { $group: {
            _id: "$_id.sucursal",
            meses: {
              $push: {
                mes: "$_id.mes",
                total: "$total"
              }
            }
          }
        },
        {
          $sort: { _id: 1}
        }
      ]
      , function(err, reporte){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          return res.status(200).json(reporte);
        }
      }
    );
  } else {
    Detalle.aggregate(
      [
        { $project: {
            cargado: "$cargado",
            categoria: "$categoria",
            mes: { $month: "$fecha"},
            anio: { $year: "$fecha" },
            valor: "$valor",
            estado: "$estado"
          }
        },
        { $match: {
            anio: {
              $eq: Number(req.body.anio)
            },
            categoria: {
              $eq: req.body.categoria
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        },
        { $group: {
            _id: {
              sucursal: "$cargado",
              mes: "$mes"
            },
            total: {
              $sum: "$valor"
            }
          }
        },
        { $group: {
            _id: "$_id.sucursal",
            meses: {
              $push: {
                mes: "$_id.mes",
                total: "$total"
              }
            }
          }
        },
        { $sort: { _id: 1}
        }
      ]
      , function(err, reporte){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          return res.status(200).json(reporte);
        }
      }
    );
  }

}

exports.yearOfDetalles = function(req, res){
  Detalle.aggregate([
    { $project: {
        fecha: "$fecha",
        estado: "$estado"
      }
    },
    {
      $match: {
        estado: {
          $eq: 'Aprobado'
        }
      }
    },
    { $group: {
        _id: { $year: "$fecha" }
      }
    },
    { $sort: { _id: 1}
    }
  ], function(err, anios){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(anios);
    }
  });
};

exports.categoriaDetallesXYear = function(req, res){
  Detalle.aggregate([
    { $project: {
        categoria: "$categoria",
        anio: { $year: "$fecha" },
        estado: "$estado"
      }
    },
    {
      $match: {
        anio: {
          $eq: Number(req.params.anio)
        },
        estado: {
          $eq: 'Aprobado'
        }
      }
    },
    {
      $group: {
        _id: "$categoria"
      }
    }
  ], function(err, categorias){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(categorias);
    }
  });
};

exports.estadoByCaja = function(req, res) {
  var idCaja = req.params.idCaja;
  var estado = req.body.estado;
  var administrador = req.session.usuario.id;
  Detalle.find({'caja': idCaja}, function(err, detalles){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      for(var i in detalles){
        detalles[i].estado = estado;
        detalles[i].administrador = administrador;
        detalles[i].save();
      }
      return res.status(200).json(detalles);
    }
  });
};

exports.sucursalesDetallesXYear = function(req, res){
  Detalle.aggregate([
    { $project: {
        cargado: "$cargado",
        anio: { $year: "$fecha" },
        estado: "$estado"
      }
    },
    {
      $match: {
        anio: {
          $eq: Number(req.params.anio)
        },
        estado: {
          $eq: 'Aprobado'
        }
      }
    },
    {
      $group: {
        _id: "$cargado"
      }
    }
  ], function(err, categorias){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(categorias);
    }
  });
};

exports.reporteXCategoria = function(req, res) {
  if(req.body.sucursal == 'Todas'){
    Detalle.aggregate(
      [
        { $project: {
            categoria: "$categoria",
            cargado: "$cargado",
            mes: { $month: "$fecha"},
            anio: { $year: "$fecha" },
            valor: "$valor",
            estado: "$estado"
          }
        },
        { $match: {
            anio: {
              $eq: Number(req.body.anio)
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        },
        { $group: {
            _id: {
              categoria: "$categoria",
              mes: "$mes"
            },
            total: {
              $sum: "$valor"
            }
          }
        },
        { $group: {
            _id: "$_id.categoria",
            meses: {
              $push: {
                mes: "$_id.mes",
                total: "$total"
              }
            }
          }
        },
        {
          $sort: { _id: 1}
        }
      ]
      , function(err, reporte){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          return res.status(200).json(reporte);
        }
      }
    );
  } else {
    Detalle.aggregate(
      [
        { $project: {
            cargado: "$cargado",
            categoria: "$categoria",
            mes: { $month: "$fecha"},
            anio: { $year: "$fecha" },
            valor: "$valor",
            estado: "$estado"
          }
        },
        { $match: {
            anio: {
              $eq: Number(req.body.anio)
            },
            cargado: {
              $eq: req.body.sucursal
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        },
        { $group: {
            _id: {
              categoria: "$categoria",
              mes: "$mes"
            },
            total: {
              $sum: "$valor"
            }
          }
        },
        { $group: {
            _id: "$_id.categoria",
            meses: {
              $push: {
                mes: "$_id.mes",
                total: "$total"
              }
            }
          }
        },
        { $sort: { _id: 1}
        }
      ]
      , function(err, reporte){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          return res.status(200).json(reporte);
        }
      }
    );
  }

}

exports.detallesByCelda = function(req, res){
  if(req.body.tipo == 'local'){
    Detalle.aggregate(
      [
        {
          $project:{
            fecha: "$fecha",
            anio: { $year: "$fecha" },
            mes: { $month: "$fecha" },
            cargado: "$cargado",
            valor: "$valor",
            estado: "$estado",
            anexo: "$anexo",
            entregado: "$entregado",
            descripcion: "$descripcion",
            tipo: "$tipo",
            categoria: "$categoria",
            caja: "$caja",
            administrador: "$administrador"
          }
        },
        {
          $match:{
            cargado: {
              $eq: req.body.nombre
            },
            anio: {
              $eq: Number(req.body.anio)
            },
            mes: {
              $eq: Number(req.body.mes)
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        }
      ],
      function(err, detalles){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          Usuario.populate(detalles, {path: 'administrador'}, function(err, detalles){
            return res.status(200).json(detalles);
          });
        }
      }
    )
  }
  if(req.body.tipo == 'categoria'){
    Detalle.aggregate(
      [
        {
          $project:{
            fecha: "$fecha",
            anio: { $year: "$fecha" },
            mes: { $month: "$fecha" },
            cargado: "$cargado",
            valor: "$valor",
            estado: "$estado",
            anexo: "$anexo",
            entregado: "$entregado",
            descripcion: "$descripcion",
            tipo: "$tipo",
            categoria: "$categoria",
            caja: "$caja",
            administrador: "$administrador"
          }
        },
        {
          $match:{
            categoria: {
              $eq: req.body.nombre
            },
            anio: {
              $eq: Number(req.body.anio)
            },
            mes: {
              $eq: Number(req.body.mes)
            },
            estado: {
              $eq: 'Aprobado'
            }
          }
        }
      ],
      function(err, detalles){
        if(err){
          return res.status(500).send({
            message: getErrorMessage(err)
          });
        } else {
          Usuario.populate(detalles, {path: 'administrador'}, function(err, detalles){
            return res.status(200).json(detalles);
          });
        }
      }
    )
  }

}

exports.getAniosDetalleBySucursal = function(req, res){
  Detalle.aggregate([
    { $project: {
        fecha: "$fecha",
        estado: "$estado",
        cargado: '$cargado'
      }
    },
    {
      $match: {
        estado: {
          $eq: 'Aprobado'
        },
        cargado: {
          $eq: req.session.usuario.sucursal.nombre
        }
      }
    },
    { $group: {
        _id: { $year: "$fecha" }
      }
    },
    { $sort: { _id: 1}
    }
  ], function(err, anios){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(anios);
    }
  });
}
