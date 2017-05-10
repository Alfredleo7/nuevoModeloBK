'use strict';
var Usuario = require('mongoose').model('Usuario');

var getErrorMessage = function(err){
  if (err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
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
}

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
