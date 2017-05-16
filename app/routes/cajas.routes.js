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

  app.route('/api/cajasPendientes')
    .get(cajas.listPendientes);

  app.route('/api/aprobarCaja/:cajaId')
    .put(cajas.aprobar);

  app.route('/api/rechazarCaja/:cajaId')
    .put(cajas.rechazar);

  app.param('cajaId', cajas.cajaByID);
}
