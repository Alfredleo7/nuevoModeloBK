'use strict';

var sucursales = require('../controllers/sucursales.controllers');

module.exports = function(app){
  app.route('/api/sucursales')
    .get(sucursales.list)
    .post(sucursales.create);

  app.route('/api/empresas')
    .get(sucursales.getEmpresas);

  app.route('/api/sucursalesByEmpresa/:empresa')
    .get(sucursales.getSucursalesByEmpresa);

  app.route('/cambiarEmpresa')
    .post(sucursales.cambiarEmpresa);
};
