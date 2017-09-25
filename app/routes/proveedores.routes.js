'use strict';

var proveedores = require('../controllers/proveedores.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app) {
  app.route('/api/proveedores')
    .get(verify.hasSession, proveedores.list)
    .post(verify.hasSession, proveedores.create);
  app.route('/api/proveedores/:proveedorId')
    .put(verify.hasSession, proveedores.update)
    .get(verify.hasSession, proveedores.read)
    .delete(verify.hasSession, proveedores.delete);
  app.param('proveedorId', proveedores.proveedorByID);

  app.route('/arreglarProveedores')
    .get(proveedores.arreglarProveedores);
}
