'use strict';

var detalles = require('../controllers/detalles.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app) {
  app.route('/api/detalles')
    .get(verify.hasSession, detalles.list)
    .post(verify.hasSession, verify.isOperario, detalles.create);

  app.route('/api/detalles/:detalleId')
    .get(verify.hasSession, detalles.read)
    .put(verify.hasSession, verify.isOperario, detalles.update)
    .delete(verify.hasSession, detalles.delete);

  app.route('/api/detallesByCaja/:idCaja')
    .get(verify.hasSession, detalles.listByCaja)
    .delete(verify.hasSession, detalles.deleteByCaja)
    .put(verify.hasSession, detalles.estadoByCaja);

  app.route('/api/reporteXSucursal')
    .post(verify.hasSession, detalles.reporteXSucursal);

  app.param('detalleId', detalles.detalleByID);

  app.route('/api/aniosDetalles')
    .get(verify.hasSession, detalles.yearOfDetalles);

  app.route('/api/categoriasXYear/:anio')
    .get(verify.hasSession, detalles.categoriaDetallesXYear);

  app.route('/api/sucursalesXYear/:anio')
    .get(verify.hasSession, detalles.sucursalesDetallesXYear);

  app.route('/api/reporteXCategoria')
    .post(verify.hasSession, detalles.reporteXCategoria);

  app.route('/api/detallesByCelda')
    .post(verify.hasSession, detalles.detallesByCelda);

  app.route('/api/aniosDetalleBySucursal')
    .get(verify.hasSession, detalles.getAniosDetalleBySucursal);

  app.route('/api/DetallesBySucursal/:anio')
    .get(verify.hasSession, detalles.getDetallesBySucursal);

  app.route('/api/valorXMesSucursalCategoria/:sucursal/:categoria/:mes/:anio')
    .get(verify.hasSession, detalles.valorXMesSucursalCategoria);

  app.route('/api/detallesOfCelda/:anio/:mes/:sucursal/:categoria')
    .get(verify.hasSession, detalles.detallesOfCelda);

  app.route('/api/reporteDetalles')
    .get(detalles.reporteDetalles);

  /*app.route('/detalles')
    .get(detalles.crearNumeroFactura);
  app.route('/verRepetidas')
    .get(detalles.verRepetidas);*/
  app.route('/existeFactura/:fac_establecimiento/:fac_puntoEmision/:fac_secuencia')
    .get(detalles.existeFactura);
}
