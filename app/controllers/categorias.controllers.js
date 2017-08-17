'use strict';

var mongoose = require('mongoose');
var Categoria = mongoose.model('Categoria');

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
  var categoria = new Categoria(req.body);

  categoria.save(function(err, categoria){
    if(err) {
      res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(categoria);
    }
  });
};

exports.list = function(req, res){
  Categoria.find({},null, {sort: {nombre: 1}}, function(err, categorias){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(categorias);
    }
  });
};

exports.update = function(req, res){
  Categoria.findById(req.params.categoriaId, function(err, categoria){
    categoria.nombre = req.body.nombre;
    categoria.save(function(err, categoria){
      if(err) {
        res.status(400).send({
          message: getErrorMessage(err)
        })
      } else {
        res.json(categoria);
      }
    })
  })
}

exports.delete = function(req, res){
  Categoria.remove({_id:req.params.categoriaId}, function(err, categoria){
    if(err){
      return res.status(500).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(categoria);
    }
  })
}
