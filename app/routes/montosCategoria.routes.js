'use stric';

var montosCategorias = require('../controllers/montosCategoria.controllers');

module.exports = function(app){
  app.route('/api/montosCategorias/:categoriaId')
    .get(montosCategorias.listByCategoria);
  app.route('/api/montosCategorias')
    .post(montosCategorias.create);
  app.route('/api/deleteMontosCategorias/:montoId')
    .delete(montosCategorias.delete);

}
