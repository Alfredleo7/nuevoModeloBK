'use strict';

var empresas = require('../controllers/empresas.controllers');

module.exports = function(app){
  app.route('/api/empresas')
    .get(empresas.list)
    .post(empresas.create);
}
