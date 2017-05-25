'use strict';

var sucursales = require('../controllers/sucursales.controllers');

module.exports = function(app){
  app.route('/api/sucursales')
  .get(sucursales.list)
    .post(sucursales.create);
};
