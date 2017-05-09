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

exports.detalleByCaja = function(req, res) {
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

exports.detalleByID = function(req, res, next, id){
  Detalle.findById(id, function(err, detalle){
    if (err) return next(err);
    if (!detalle) return next(new Error('Fallo al cargar el detalle '+ id));
    req.detalle = detalle;
    next();
  });
};
