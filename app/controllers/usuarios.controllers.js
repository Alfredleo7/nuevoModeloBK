'use strict';
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');
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

exports.ingresar = function(req, res){
  if(!req.session.usuario){
    res.render('login');
  } else {

    if(req.session.usuario.tipo === 'General'){
      res.render('general', {usuario: req.session.usuario});
    }

    if(req.session.usuario.tipo === 'Administrador'){
      res.render('administrador', {usuario: req.session.usuario});
    }

    if(req.session.usuario.tipo === 'Gerente'){
      res.status(200).send({
        message: 'Gerente logueado correctamente'
      });
    }
  }
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
  Usuario.findOne({'usuario': usuarioIn.usuario}, function(err, usuario){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    }
    if (!usuario) {
      return res.status(404).send({
        message: 'El usuario no se encuentra registrado'
      })
    }
    if(usuarioIn.password == crypto.desencriptar(usuario.password)){
      console.log(usuario.empresa);
      Empresa.findById(usuario.empresa, function(err, empresa){
        if(empresa){
          Sucursal.findById(usuario.sucursal, function(err, sucursal){
            if(sucursal){
              req.session.usuario = {
                id: usuario._id,
                usuario: usuario.usuario,
                fullname: usuario.firstName + ' ' + usuario.lastName,
                tipo: usuario.tipo,
                empresa: empresa,
                sucursal: sucursal
              };
              return res.status(200).send({
                message: 'Autenticación exitosa'
              });
            } else {
              return res.status(404).send({
                message: 'El Local/Departamento no existe'
              })
            }
          })
        } else {
          return res.status(404).send({
            message: 'La empresa no existe'
          })
        }
      })
    } else {
      return res.status(404).send({
        message: 'contraseña incorrecta'
      })
    }
  });
};

exports.singOut =function(req, res){
  delete req.session.usuario;
  res.redirect('/');
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
