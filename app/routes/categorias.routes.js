'use strict';

var categorias = require('../controllers/categorias.controllers');

module.exports = function(app){
  app.route('/api/categorias')
    .get(categorias.list)
    .post(categorias.create);
}