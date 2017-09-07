'use strict';

var categorias = require('../controllers/categorias.controllers');
var verify = require('../services/verificarSesion');

module.exports = function(app){
  app.route('/api/categorias')
    .get(verify.hasSession, categorias.list)
    .post(verify.hasSession, verify.isSuper, categorias.create);
  app.route('/api/categorias/:categoriaId')
    .put(verify.hasSession, verify.isSuper, categorias.update)
    .delete(verify.hasSession, verify.isSuper, categorias.delete);
}
