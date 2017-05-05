'use strict';

var detalles = require('../controllers/detalles.controllers');

module.exports = function(app) {
  app.route('/api/detalles')
    .get(detalles.list)
    .post(detalles.create);

  app.route('/api/detalles/:detalleId')
    .get(detalles.read)
    .put(detalles.update);

  app.params('detalleId', detalles.detalleByID);
}
