'use strict';

var mongoose = require('mongoose');
var Sucursal = mongoose.model('Sucursal');
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

exports.create = function(req, res) {
  var sucursal = new Sucursal(req.body);
  sucursal.save(function(err, sucursal){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      Empresa.findById(sucursal.empresa, function(err, empresa){
        empresa.numSucursales++;
        empresa.save(function(err, empresa){
          sucursal.codSucursal = empresa.codEmpresa * 100 + empresa.numSucursales;
          sucursal.save(function(err, sucursal){
            if(err){
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            } else {
              res.json(sucursal);
            }
          })
        });
      });
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
      Empresa.populate(sucursales, {path: 'empresa'}, function(err, sucursales){
        res.status(200).send(sucursales);
      });
    }
  });
};

/*exports.getEmpresas = function(req, res){
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
};*/

exports.getSucursalesByEmpresa = function(req, res){

  var idEmpresa = req.params.empresa;

  Sucursal.find({empresa: idEmpresa}, function(err, sucursales){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else{
      res.status(200).send(sucursales);
    }
  });

  /*Sucursal.aggregate([
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
  });*/
};

exports.inicializarSucursales = function(req, res){
  Sucursal.find({}, function(err, sucursales){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else{
      for(var i in sucursales){
        sucursales[i].numCajas = 0;
        sucursales[i].save();
      }
      return res.status(200).send("se realizó con éxito la inicialización");
    }
  });
}
