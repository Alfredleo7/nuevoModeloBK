var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db, function(err){
    if(err){
      console.log('Error: ' + err);
    } else {
      console.log('Conectado con la base');
    }
  });

  require('../app/models/usuarios.models');
  require('../app/models/cajas.models');
  require('../app/models/detalles.models');

  return db;
}
