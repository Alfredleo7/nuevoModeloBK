'use strict';

var mongoose = require('mongoose');
var Detalle = mongoose.model('Detalle');

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
      res.json(detalle);
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

  detalle.valor = req.body.valor;
  detalle.empresa = req.body.empresa;
  detalle.categoria = req.body.categoria;

  detalle.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(detalle);
    }
  });
};

exports.delete = function(req, res){
  var detalle = req.detalle;

  detalle.remove(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(detalle);
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
      res.json(detalles);
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
  console.log(req.params.anio);
  Detalle.aggregate([
    { $project: {
        categoria: "$categoria",
        anio: { $year: "$fecha" }
      }
    },
    {
      $match: {
        anio: {
          $eq: Number(req.params.anio)
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
  console.log(req.body.estado);
  Detalle.find({'caja': idCaja}, function(err, detalles){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      for(var i in detalles){
        detalles[i].estado = estado;
        detalles[i].save();
      }
      return res.status(200).json(detalles);
    }
  });
};
