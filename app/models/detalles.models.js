var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detalleSchema = new Schema({
  valor: Number,
  empresa: String,
  categoria: String
});

mongoose.model('Detalle', detalleSchema);
