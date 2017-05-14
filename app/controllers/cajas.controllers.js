'use strict';

var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');

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
  Caja.find({'creador': req.session.usuario.id}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(cajas);
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
    req.caja = caja;
    next();
  });
};
