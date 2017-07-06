'use strict';

var mongoose = require('mongoose');
var Proveedor = mongoose.model('Proveedor');

var getErrorMessage = function(err) {
  // Definir la variable de error message
  var message = '';

  // Si un error interno de MongoDB ocurre obtener el mensaje de error
  if (err.code) {
    switch (err.code) {
      // Si un eror de index único ocurre configurar el mensaje de error
      case 11000:
      case 11001:
        message = 'El Proveedor ya se encuentra registrado';
        break;
      // Si un error general ocurre configurar el mensaje de error
      default:
        message = 'Error de servidor desconocido';
    }
  } else {
    // Grabar el primer mensaje de error de una lista de posibles errores
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Devolver el mensaje de error
  return message;
};

exports.create = function(req, res) {
  var proveedorReq = new Proveedor(req.body);
  var existeConRuc = false;
  var existeConCedula = false;

  Proveedor.findOne({ruc: proveedorReq.ruc}, function(err, proveedor){
    if(proveedor){
      return res.status(400).send({
        message: 'El proveedor ya existe'
      });
    } else {
      Proveedor.findOne({cedula: proveedorReq.cedula}, function(err, proveedor){
        if(proveedor){
          return res.status(400).send({
            message: 'El proveedor ya existe'
          });
        } else {
          proveedorReq.save(function(err){
            if(err){
              return res.status(400).send({
                message: getErrorMessage(err)
              })
            } else {
              return res.json(proveedor);
            }
          });
        }
      })
    }
  })

  /*if(proveedor.ruc){
    Proveedor.findOne({ruc: proveedor.ruc}, function(err, proveedor){
      if(proveedor){
        existeConRuc = true;
      }
    })
  }
  if(proveedor.cedula){
    Proveedor.findOne({cedula: proveedor.cedula}, function(err, proveedor){
      if(proveedor){
        existeConCedula = true;
      }
    })
  }
  if(!existeConRuc || !existeConCedula){
    proveedor.save(function(err){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        })
      } else {
        return res.json(proveedor);
      }
    });
  } else {
    return res.status(400).send({
      message: 'El proveedor ya existe'
    });
  }*/

};

exports.list = function(req, res){
  Proveedor.find({},null,{sort: { nombre: 1}}, function(err, proveedores){
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(proveedores);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.proveedor);
};

exports.delete = function(req, res){
  var proveedor = req.proveedor;

  proveedor.remove(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(proveedor);
    }
  });
};

exports.proveedorByID = function(req, res, next, id){
  Proveedor.findById(id, function(err, proveedor){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      if(!proveedor){
        return res.status(404).send({
          message: 'No existe el proveedor'
        })
      }
      req.proveedor = proveedor;
      next();
    }
  });
};
