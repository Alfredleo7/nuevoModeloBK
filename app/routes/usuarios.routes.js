'use strict';

var usuarios = require('../controllers/usuarios.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app) {
  app.route('/')
    .get(usuarios.ingresar);

  app.route('/cgi-sys/defaultwebpage.cgi')
    .get(function(req, res){
      res.redirect('/');
    });

  app.route('/api/usuarios')
    .get(verify.hasSession, verify.isSuper, usuarios.list)
    .post(usuarios.signUp);

  app.route('/api/usuarios/:usuarioId')
    .delete(verify.hasSession, verify.isSuper, usuarios.deleteUsuario)
    .put(verify.hasSession, usuarios.updateUsuario);

  app.route('/api/usuariosLogin')
    .post(usuarios.signIn);
  app.route('/api/usuariosLogout')
    .get(verify.hasSession, usuarios.singOut);

  app.route('/api/usuariosPassword')
    .put(verify.hasSession, usuarios.haySession, usuarios.cambiarPassword);

  app.route('/api/usuarios/:tipo')
    .get(verify.hasSession, verify.isSuper, usuarios.usuariosByTipo);

  app.route('/api/Credencial')
    .get(verify.hasSession, usuarios.getCredencial);

  app.param('usuarioId', usuarios.usuariosByID);


  /*app.route('/api/detalles/:detalleId')
    .get(detalles.read)
    .put(detalles.update)
    .delete(detalles.delete);

  app.route('/api/detallesByCaja/:idCaja')
    .get(detalles.listByCaja)
    .delete(detalles.deleteByCaja);

  app.param('detalleId', detalles.detalleByID);*/

}
