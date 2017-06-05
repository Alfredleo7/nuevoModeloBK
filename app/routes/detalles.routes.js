'use strict';

var detalles = require('../controllers/detalles.controllers');

module.exports = function(app) {
  app.route('/api/detalles')
    .get(detalles.list)
    .post(detalles.create);

  app.route('/api/detalles/:detalleId')
    .get(detalles.read)
    .put(detalles.update)
    .delete(detalles.delete);

  app.route('/api/detallesByCaja/:idCaja')
    .get(detalles.listByCaja)
    .delete(detalles.deleteByCaja)
    .put(detalles.estadoByCaja);

  app.route('/api/reporteXSucursal')
    .post(detalles.reporteXSucursal);

  app.param('detalleId', detalles.detalleByID);

  app.route('/api/aniosDetalles')
    .get(detalles.yearOfDetalles);

  app.route('/api/categoriasXYear/:anio')
    .get(detalles.categoriaDetallesXYear);

}
