'use strict';
var Usuario = require('mongoose').model('Usuario');
var crypto = require('../services/crypto.js');

var getErrorMessage = function(err) {
  // Definir la variable de error message
  var message = '';

  // Si un error interno de MongoDB ocurre obtener el mensaje de error
  if (err.code) {
    switch (err.code) {
      // Si un eror de index único ocurre configurar el mensaje de error
      case 11000:
      case 11001:
        message = 'El correo ya existe';
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

exports.signUp = function(req, res){
  var usuario = Usuario(req.body);
  usuario.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(usuario);
    }
  })
};

exports.signIn = function(req, res){
  var usuarioIn = Usuario(req.body);
  Usuario.findOne({'email': usuarioIn.email}, function(err, usuario){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    }
    if (!usuario) {
      return res.status(404).send({
        message: 'El usuario no existe'
      })
    }
    if(usuarioIn.password == crypto.desencriptar(usuario.password)){
      return res.status(200).send({
        message: 'el usuario ' + usuario.email + ' se ha logueado'
      })
    } else {
      return res.status(404).send({
        message: 'contraseña incorrecta'
      })
    }
  });
};

exports.list = function(req, res){
  Usuario.find({}, function(err, usuarios){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(usuarios);
    }
  });
};

/*exports.usuarioByID = function(req, res, next, id){
  Usuario.findById(id, function(err, usuario){
    if (err) return next(err);
    if (!usuario) return next(new Error('Fallo al cargar el usuario '+ id));
    req.usuario = usuario;
    next();
  });
};*/

/*exports.inicio = function(req, res){
  res.status(200).render('inicio');
}*/
