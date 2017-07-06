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
  Sucursal.find({}, null, {sort: { nombre: 1}}, function(err, sucursales){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else{
      res.json(sucursales);
    }
  });
};

exports.getEmpresas = function(req, res){
  Sucursal.aggregate([
    {
      $project: {
        empresa: "$empresa"
      }
    },
    {
      $group: {
        _id: "$empresa"
      }
    },
    {
      $sort: { _id: 1 }
    }
  ], function(err, empresas){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(empresas);
    }
  });
};

exports.getSucursalesByEmpresa = function(req, res){
  Sucursal.aggregate([
    {
      $project: {
        nombre: "$nombre",
        empresa: "$empresa",
        tipo: "$tipo"
      }
    },
    {
      $match: {
        empresa: {
          $eq: req.params.empresa
        }
      }
    },
    {
      $group: {
        _id: {
          tipo: "$tipo",
          nombre: "$nombre"
        }
      }
    },
    {
      $sort: { _id: 1}
    }
  ], function(err, sucursales){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      });
    } else {
      return res.status(200).json(sucursales);
    }
  });
};

exports.cambiarEmpresa = function(req, res){
  var nombre = req.body.nombre;
  var empresa  = req.body.empresa;
  var tipo = req.body.tipo;

  Sucursal.findOne({nombre: req.body.nombre}, function(err, sucursal){
    if(sucursal){
      sucursal.tipo = tipo;
      sucursal.empresa = empresa;
      sucursal.save(function(err, sucursal){
        return res.json(sucursal);
      });
    } else {
      return res.send('error');
    }
  })
}
