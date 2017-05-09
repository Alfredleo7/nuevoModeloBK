var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');
var Schema = mongoose.Schema;

var detalleSchema = new Schema({
  valor: Number,
  empresa: String,
  categoria: String,
  caja: {
    type: Schema.ObjectId,
    ref: "Caja"
  }
});

mongoose.model('Detalle', detalleSchema);
