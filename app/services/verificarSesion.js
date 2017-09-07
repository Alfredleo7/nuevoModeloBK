'use strict';

exports.hasSession = function(req, res, next){
  if(!req.session.usuario){
    res.status(500).send({
      message: 'Su sesión ha finalizado, por favor actualice la página'
    });
  } else {
    next();
  }
}

exports.isOperario = function(req, res, next){
  if(req.session.usuario.tipo == 'General'){
    next();
  } else {
    res.status(500).send({
      message: 'No Autorizado'
    })
  }
}

exports.isAdministrador = function(req, res, next){
  if(req.session.usuario.tipo == 'Administrador'){
    next();
  } else {
    res.status(400).send({
      message: 'No Autorizado'
    })
  }
}

exports.isSuper = function(req, res, next){
  if(req.session.usuario.tipo == 'Super'){
    next();
  } else {
    res.status(400).send({
      message: 'No Autorizado'
    })
  }
}

exports.isNotOerario = function(req, res, next){
  if(req.session.usuario.tipo == 'General'){
    res.status(400).send({
      message: 'No Autorizado'
    })
  } else {
    next();
  }
}

exports.isNotAdministrador = function(req, res, next){
  if(req.session.usuario.tipo == 'Administrador'){
    res.status(400).send({
      message: 'No Autorizado'
    })
  } else {
    next();
  }
}

exports.isNotSuper = function(req, res, next){
  if(req.session.usuario.tipo == 'Super'){
    res.status(400).send({
      message: 'No Autorizado'
    })
  } else {
    next();
  }
}
