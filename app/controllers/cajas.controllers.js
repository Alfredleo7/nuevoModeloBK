'use strict';

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Caja = mongoose.model('Caja');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');
var nodemailer = require('nodemailer');

var getErrorMessage = function(err){
  if (err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message){
        return err.errors[errName].message;
      }
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.create = function(req, res){
  var caja = new Caja();
  caja.creador = req.session.usuario.id;
  caja.empresa = req.session.usuario.empresa;
  caja.sucursal = req.session.usuario.sucursal;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(caja);
    }
  });
};

exports.list = function(req, res){
  Caja.find({}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(cajas);
    }
  });
};

exports.read = function(req, res){
  res.json(req.caja);
};

exports.update = function(req, res){
  var caja = req.caja;

  caja.valor = req.body.valor;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(caja);
    }
  });
};

exports.delete = function(req, res){
  var caja = req.caja;

  caja.remove(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(caja);
    }
  });
};

//Cajas por usuario

exports.listByUsuario = function(req, res){
  Caja.find({'creador': req.session.usuario.id, 'estado': req.params.estado}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        res.json(cajas);
      });
    }
  });
};

//Cajas por estado
exports.listPendientes = function(req, res){
  Caja.find({'estado': 'Pendiente'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Empresa.populate(cajas, {path: 'empresa'}, function(err, cajas){
        Sucursal.populate(cajas, {path: 'sucursal'}, function(err, cajas){
          return res.status(200).json(cajas);
        });
      });
    }
  });
}

exports.listAprobados = function(req, res){
  Caja.find({'estado': 'Aprobado'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        Empresa.populate(cajas, {path: 'empresa'}, function(err, cajas){
          Sucursal.populate(cajas, {path: 'sucursal'}, function(err, cajas){
            return res.status(200).json(cajas);
          });
        });
      });
    }
  });
}

exports.listRechazados = function(req, res){
  Caja.find({'estado': 'Rechazado'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        Empresa.populate(cajas, {path: 'empresa'}, function(err, cajas){
          Sucursal.populate(cajas, {path: 'sucursal'}, function(err, cajas){
            return res.status(200).json(cajas);
          });
        });
      });
    }
  });
}

exports.aprobar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Aprobado';
  caja.administrador = req.session.usuario.id;


  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {

      Usuario.findById(caja.creador, function(err, creador){

        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'resnorteweb@gmail.com',
            pass: 'passresnorte'
          }
        });

        var mailOptions = {
          from: 'Dep. de Sistemas Resnorte <resnorteweb@gmail.com>',
          to: creador.usuario + '@burgerkingec.com.ec,'+ req.session.usuario.usuario +'@burgerkingec.com.ec',
          //to: 'stalgonz@espol.edu.ec,alfred.leo.7@gmail.com',
          subject: 'Notificación de Aprobación de Caja Chica',
          html: 'Estimado Usuario,<br>'+
                '<br>'+
                'Le comunicamos que se ha realizado la aprobación de la Caja Chica con secuencial '+caja.secuencial+'.<br>'+
                '<b>Custodio: </b>'+caja.sucursal.tipo+' '+caja.sucursal.nombre+'<br>'+
                '<b>Total: $</b>'+Number(caja.valor.toFixed(2))+'<br>'+
                'Aprobación realizada por '+req.session.usuario.fullname+'.<br>'+
                '<br>'+
                'Saludo Cordiales,<br>'+
                '<br>'+
                'Departamento de Sistemas<br>'+
                '<a href="http://www.resnorteweb.com">www.resnorteweb.com</a>',
        }

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
              console.log(error);
              //res.redirect('/');
          } else {
              console.log('Mensaje enviado: ' + info.response);
              //res.redirect('/');
          }
        })

      });

      res.json(caja);

    }
  });
};

exports.rechazar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Rechazado';
  caja.observacion = req.body.observacion;
  caja.administrador = req.session.usuario.id;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      Usuario.findById(caja.creador, function(err, creador){

        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'resnorteweb@gmail.com',
            pass: 'passresnorte'
          }
        });

        var mailOptions = {
          from: 'Dep. de Sistemas Resnorte <resnorteweb@gmail.com>',
          to: creador.usuario + '@burgerkingec.com.ec,'+ req.session.usuario.usuario +'@burgerkingec.com.ec',
          //to: 'stalgonz@espol.edu.ec,alfred.leo.7@gmail.com',
          subject: 'Notificación de Aprobación de Caja Chica',
          html: 'Estimado Usuario,'+
                '<br><br>'+
                'Le comunicamos que la Caja Chica con secuencial '+caja.secuencial+' no fue aprobada.'+
                '<b>Custodio: </b>'+caja.sucursal.tipo+' '+caja.sucursal.nombre+'<br>'+
                '<b>Total: $</b>'+Number(caja.valor.toFixed(2))+'<br>'+
                '<br>'+
                'Administrador responsable: '+req.session.usuario.fullname+'.'+
                '<br><br>'+
                'Saludo Cordiales,'+
                '<br><br>'+
                'Departamento de Sistemas'+
                '<br>'+
                '<a href="http://www.resnorteweb.com">www.resnorteweb.com</a>',
        }

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
              console.log(error);
              //res.redirect('/');
          } else {
              console.log('Mensaje enviado: ' + info.response);
              //res.redirect('/');
          }
        })

      });
      res.json(caja);
    }
  });
};


exports.enviar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Pendiente';
  caja.observacion = undefined;

  caja.save(function(err, caja){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      Sucursal.findById(caja.sucursal._id, function(err, sucursal){
        sucursal.numCajas ++;
        sucursal.save();
        caja.secuencial = sucursal.codSucursal * 10000 + sucursal.numCajas;
        caja.save();

        return res.status(200).json(caja);
      })
    }
  });
};

exports.cajaByID = function(req, res, next, id){
  Caja.findById(id, function(err, caja){
    if (err) return next(err);
    if (!caja){
      return res.status(404).send({
        message: 'La caja no existe'
      })
    }

    Usuario.findById(caja.administrador, function(err, usuario){
      if(usuario){
        caja.administrador = usuario;
      }
      Empresa.findById(caja.empresa, function(err, empresa){
        caja.empresa = empresa;
        Sucursal.findById(caja.sucursal, function(err, sucursal){
          caja.sucursal = sucursal;
          req.caja = caja;
          next();
        })
      })
    });
  });
};

exports.cajasConSecuencial = function(req, res){
  Caja.find({estado: ['Pendiente', 'Aprobado', 'Rechazado']},null, {sort: {creado: 1}}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        Empresa.populate(cajas, {path: 'empresa'}, function(err, cajas){
          Sucursal.populate(cajas, {path: 'sucursal'}, function(err, cajas){
            Usuario.populate(cajas, {path: 'creador'}, function(err, cajas){
              Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
                return res.status(200).json(cajas);
              })
            })
          });
        });
      });
    }
  });
}

exports.getSurcursalesConCajasPendientes = function(req, res){
  Caja.aggregate(
    [
      {
        $project: {
          sucursal: '$sucursal',
          estado: '$estado',
          empresa: '$empresa'
        }
      },
      {
        $match: {
          estado: 'Pendiente'
        }
      },
      {
        $group: {
          _id: {
            sucursal: '$sucursal',
            empresa: '$empresa'
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ],
    function(err, sucursales){
      if(err){
        return res.status(500).send({
          message: getErrorMessage(err)
        })
      } else {
        Sucursal.populate(sucursales, {path: '_id.sucursal'}, function(err, sucursales){
          Empresa.populate(sucursales, {path: '_id.empresa'}, function(err, sucursales){
            return res.status(200).json(sucursales);
          })
        })
        //return res.status(200).json(sucursales);
      }
    }
  )
}

exports.getSurcursalesConCajasAprobadas = function(req, res){
  Caja.aggregate(
    [
      {
        $project: {
          sucursal: '$sucursal',
          estado: '$estado',
          empresa: '$empresa'
        }
      },
      {
        $match: {
          estado: 'Aprobado'
        }
      },
      {
        $group: {
          _id: {
            sucursal: '$sucursal',
            empresa: '$empresa'
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ],
    function(err, sucursales){
      if(err){
        return res.status(500).send({
          message: getErrorMessage(err)
        })
      } else {
        Sucursal.populate(sucursales, {path: '_id.sucursal'}, function(err, sucursales){
          Empresa.populate(sucursales, {path: '_id.empresa'}, function(err, sucursales){
            return res.status(200).json(sucursales);
          })
        })
        //return res.status(200).json(sucursales);
      }
    }
  )
}

exports.getCajasPendientesBySucursal = function(req, res){
  Caja.find({$and:[{sucursal: req.params.sucursalId}, {estado: 'Pendiente'}]},function(err, cajas){
    if(err){
      console.log(err);
      return res.status(500).send({
        message: getErrorMessage(err)
      })
    } else {
      return res.status(200).json(cajas);
    }
  })
}

exports.getCajasAprobadasBySucursal = function(req, res){
  Caja.find({$and:[{sucursal: req.params.sucursalId}, {estado: 'Aprobado'}]},function(err, cajas){
    if(err){
      console.log(err);
      return res.status(500).send({
        message: getErrorMessage(err)
      })
    } else {
      return res.status(200).json(cajas);
    }
  })
}

exports.cajasBorradorRechazados = function(req, res){
  Caja.find(
    {
      $and:[
        {
          creador: req.session.usuario.id
        },
        {
          $or:[
            {
              estado: 'Rechazado'
            },
            {
              estado: 'Borrador'
            }
          ]
        }
      ]
    }, function(err, cajas){
      if(err){
        return res.status(500).send({
          message: getErrorMessage(err)
        })
      } else {
        return res.status(200).json(cajas);
      }
    }
  )
}
