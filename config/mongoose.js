var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db, function(err){
    if(err){
      console.log('Error: ' + err);
    } else {
      console.log('Conectado con la base');
    }
  });

  require('../app/models/usuarios.models');
  require('../app/models/cajas.models');
  require('../app/models/proveedores.models');
  require('../app/models/detalles.models');
  require('../app/models/sucursales.models');
  require('../app/models/categorias.models');

  return db;
}
