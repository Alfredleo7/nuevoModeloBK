'use strict';

var usuarios = require('../controllers/usuarios.controllers');

module.exports = function(app) {
  app.route('/api/usuarios')
    .get(usuarios.list)
    .post(usuarios.signUp);
  app.route('/api/usuariosLogin')
    .post(usuarios.signIn);

  /*app.route('/api/detalles/:detalleId')
    .get(detalles.read)
    .put(detalles.update)
    .delete(detalles.delete);

  app.route('/api/detallesByCaja/:idCaja')
    .get(detalles.listByCaja)
    .delete(detalles.deleteByCaja);

  app.param('detalleId', detalles.detalleByID);*/
}
