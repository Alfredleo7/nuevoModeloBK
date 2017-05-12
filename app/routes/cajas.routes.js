'use strict';

var cajas = require('../controllers/cajas.controllers');

module.exports = function(app) {
  app.route('/api/cajas')
    .get(cajas.list)
    .post(cajas.create);

  app.route('/api/cajas/:cajaId')
    .get(cajas.read)
    .put(cajas.update)
    .delete(cajas.delete);

  app.route('/api/cajasByUsuario')
    .get(cajas.listByUsuario);

  app.param('cajaId', cajas.cajaByID);
}
