'use strict';

var mongoose = require('mongoose');
var Empresa = mongoose.model('Empresa');

var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.create = function(req, res){
  var empresa = new Empresa(req.body);
  Empresa.count({}, function(err, count){
    empresa.codEmpresa = count + 1;
    empresa.save(function(err){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(empresa);
      }
    })
  })
}


exports.list = function(req, res){
  Empresa.find({},null, {sort: {nombre: 1}}, function(err, empresas){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(empresas);
    }
  })
}
