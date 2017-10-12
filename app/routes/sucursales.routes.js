'use strict';

var sucursales = require('../controllers/sucursales.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app){
  app.route('/api/sucursales')
    .get(verify.hasSession, sucursales.list)
    .post(sucursales.create);


  app.route('/api/sucursalesByEmpresa/:empresa')
    .get(verify.hasSession, sucursales.getSucursalesByEmpresa);

  app.route('/api/inicializarSucursales')
    .get(verify.hasSession, sucursales.inicializarSucursales);

};
