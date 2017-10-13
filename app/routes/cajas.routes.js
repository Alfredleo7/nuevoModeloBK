'use strict';

var cajas = require('../controllers/cajas.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app) {
  app.route('/api/cajas')
    .get(verify.hasSession, cajas.list)
    .post(verify.hasSession, verify.isOperario, cajas.create);

  app.route('/api/cajas/:cajaId')
    .get(verify.hasSession, cajas.read)
    .put(verify.hasSession, verify.isNotSuper, cajas.update)
    .delete(verify.hasSession, cajas.delete);

  app.route('/api/cajasByUsuario/:estado')
    .get(verify.hasSession, cajas.listByUsuario);
  app.route('/api/cajasBorradorRechazados')
    .get(verify.hasSession, cajas.cajasBorradorRechazados)

  app.route('/api/cajasPendientes')
    .get(verify.hasSession, cajas.listPendientes);

  app.route('/api/cajasAprobadas')
    .get(verify.hasSession, cajas.listAprobados);

  app.route('/api/cajasRechazadas')
    .get(verify.hasSession, cajas.listRechazados);

  app.route('/api/aprobarCaja/:cajaId')
    .put(verify.hasSession, verify.isAdministrador, cajas.aprobar);

  app.route('/api/rechazarCaja/:cajaId')
    .put(verify.hasSession, verify.isAdministrador, cajas.rechazar);

  app.route('/api/enviarCaja/:cajaId')
    .put(verify.hasSession, verify.isOperario, cajas.enviar);

  app.route('/api/cajasConSecuencial')
    .get(verify.hasSession, cajas.cajasConSecuencial);

  app.route('/api/SurcursalesConCajasPendientes')
    .get(verify.hasSession, cajas.getSurcursalesConCajasPendientes);

  app.route('/api/SurcursalesConCajasAprobadas')
    .get(verify.hasSession, cajas.getSurcursalesConCajasAprobadas);

  app.route('/api/CajasPendientesBySucursal/:sucursalId')
    .get(verify.hasSession, cajas.getCajasPendientesBySucursal);

  app.route('/api/CajasAprobadasBySucursal/:sucursalId')
    .get(verify.hasSession, cajas.getCajasAprobadasBySucursal);

  app.param('cajaId', cajas.cajaByID);

  /*app.route('/comprobante')
    .get(function(req, res){
      res.render('comprobante');
    })*/
}
