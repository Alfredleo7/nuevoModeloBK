'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var empresaSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String,
    required: 'Ingrese el nombre',
    uppercase: true
  },
  codEmpresa: {
    type: Number,
    required: 'Ingrese el numero de Empresa'
  },
  numSucursales: {
    type: Number,
    default: 0
  }
});

mongoose.model('Empresa', empresaSchema);
