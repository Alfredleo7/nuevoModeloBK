'use strict';

var usuarios = require('../controllers/usuarios.controllers');

module.exports = function(app) {
  app.route('/')
    .get(usuarios.ingresar);

  app.route('/cgi-sys/defaultwebpage.cgi')
    .get(function(req, res){
      res.redirect('/');
    });

  app.route('/api/usuarios')
    .get(usuarios.list)
    .post(usuarios.signUp);
  app.route('/api/usuariosLogin')
    .post(usuarios.signIn);
  app.route('/api/usuariosLogout')
    .get(usuarios.singOut);

  app.route('/api/usuariosPassword')
    .put(usuarios.haySession, usuarios.cambiarPassword);

  app.route('/api/usuarios/:tipo')
    .get(usuarios.usuariosByTipo);

  app.route('/api/Credencial')
    .get(usuarios.getCredencial);

  /*app.route('/api/detalles/:detalleId')
    .get(detalles.read)
    .put(detalles.update)
    .delete(detalles.delete);

  app.route('/api/detallesByCaja/:idCaja')
    .get(detalles.listByCaja)
    .delete(detalles.deleteByCaja);

  app.param('detalleId', detalles.detalleByID);*/

}
