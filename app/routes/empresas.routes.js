'use strict';

var empresas = require('../controllers/empresas.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app){
  app.route('/api/empresas')
    .get(empresas.list)
    .post(verify.hasSession, empresas.create);
}
