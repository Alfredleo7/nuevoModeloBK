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

    if(req.session.usuario.tipo === 'Super'){
      res.render('super', {usuario: req.session.usuario});
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
      Empresa.findById(usuario.empresa, function(err, empresa){
        if(err){
          return res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          usuario.empresa = empresa;
          Sucursal.findById(usuario.sucursal, function(err, sucursal){
            if(err){
              return res.status(400).send({
                message: getErrorMessage(err)
              })
            } else {
              usuario.sucursal = sucursal;
              res.json(usuario);
            }
          })
        }
      });
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
  /*delete req.session.usuario;
  res.redirect('/');*/

  if(req.session){
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }

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

exports.cambiarPassword = function(req, res){
  Usuario.findById(req.session.usuario.id, function(err, usuario){
    if(req.body.nowPassword == crypto.desencriptar(usuario.password)){
      console.log(req.body);
      usuario.password = req.body.newPassword;
      usuario.save(function(err){
        return res.status(200).send({
          message: 'La contraseña ha sido actualizada correctamente'
        });
      });
    } else {
      return res.status(400).send({
        message: 'Contraseña actual incorrecta'
      });
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

exports.haySession = function(req, res, next){
  if(req.session.usuario){
    next();
  } else {
    return res.render('login');
  }
}

exports.usuariosByTipo = function(req, res){
  Usuario.find({tipo: req.params.tipo},null, {sort: {creado: 1}}, function(err, usuarios){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Empresa.populate(usuarios, {path: 'empresa'}, function(err, usuarios){
        Sucursal.populate(usuarios, {path: 'sucursal'}, function(err, usuarios){
          return res.status(200).json(usuarios);
        });
      });
    }
  });
};

exports.updateUsuario = function(req, res){
  var usuario = req.usuario;

  usuario.firstName = req.body.firstName;
  usuario.lastName = req.body.lastName;
  usuario.usuario = req.body.usuario;
  usuario.empresa = req.body.empresa
  usuario.sucursal = req.body.sucursal;

  usuario.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(usuario);
    }
  });
};

exports.usuariosByID = function(req, res, next, id){
  console.log('hola mundo');
  Usuario.findById(id, function(err, usuario){
    if (err) return next(err);
    if (!usuario){
      return res.status(404).send({
        message: 'No existe el usuario'
      })
    }
    req.usuario = usuario;
    next();
  });
};

exports.deleteUsuario = function(req, res){
  var usuario = req.usuario;
  console.log(usuario);
  usuario.remove(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(usuario);
    }
  })
}
