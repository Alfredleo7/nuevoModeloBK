'use stric';

var montosCategorias = require('../controllers/montosCategoria.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app){
  app.route('/api/montosCategorias/:categoriaId')
    .get(verify.hasSession, montosCategorias.listByCategoria);
  app.route('/api/montosCategorias')
    .post(verify.hasSession, montosCategorias.create);
  app.route('/api/deleteMontosCategorias/:montoId')
    .delete(verify.hasSession, montosCategorias.delete);
  app.route('/api/updateMontosCategorias/:montoId')
    .put(verify.hasSession, montosCategorias.update);
  app.route('/api/deleteMontosCategoriasByCategoria/:categoriaId')
    .delete(verify.hasSession, montosCategorias.deleteByCategoria);
  app.route('/api/montosBySucursal/:sucursal')
    .get(verify.hasSession, montosCategorias.montoBySucursal);
  app.route('/api/montoBySucursalCategoria/:sucursal/:categoria')
    .get(verify.hasSession, montosCategorias.montoBySucursalCategoria);
  app.route('/api/montoBySucursalSession')
    .get(verify.hasSession, montosCategorias.montoBySucursalSession);
  app.route('/api/submontos/:idMonto')
    .get(verify.hasSession,montosCategorias.subMontosMaximos);
}
