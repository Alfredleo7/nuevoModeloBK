var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');
var Schema = mongoose.Schema;

var detalleSchema = new Schema({
  valor: Number,
  empresa: {
    type: String,
    required: 'La empresa no puede estar en blanco'
  },
  categoria: String,
  caja: {
    type: Schema.ObjectId,
    ref: "Caja"
  }
});

mongoose.model('Detalle', detalleSchema);
