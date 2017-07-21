'use strict';

var proveedores = require('../controllers/proveedores.controllers');

module.exports = function(app) {
  app.route('/api/proveedores')
    .get(proveedores.list)
    .post(proveedores.create);
  app.route('/api/proveedores/:proveedorId')
    .put(proveedores.update)
    .get(proveedores.read)
    .delete(proveedores.delete);
  app.param('proveedorId', proveedores.proveedorByID);
}
