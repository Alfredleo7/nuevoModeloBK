'use strict';

var mongoose = require('mongoose');
var Sucursal = mongoose.model('Sucursal');

var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.create = function(req, res) {
  var sucursal = new Sucursal(req.body);
  sucursal.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(sucursal);
    }
  });
};

exports.list = function(req, res){
  Sucursal.find({}, function(err, sucursales){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else{
      res.json(sucursales);
    }
  });
};
