var mongoose = require('mongoose');
var Categoria = mongoose.model('Categoria');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');

var Schema = mongoose.Schema;

var montoCategoriaSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  categoria: {
    type: Schema.ObjectId,
    ref: 'Categoria',
    required: true
  },
  empresa: {
    type: Schema.ObjectId,
    ref: 'Empresa',
    required: true
  },
  sucursal: {
    type: Schema.ObjectId,
    ref: 'Sucursal',
    required: true
  },
  montoMax: {
    type: Number,
    required: true
  }
});

mongoose.model('MontoCategoria', montoCategoriaSchema);
