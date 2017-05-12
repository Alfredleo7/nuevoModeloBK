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
  },
  creador: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: "Se necesita el id del Usuario"
  }
});

mongoose.model('Detalle', detalleSchema);
