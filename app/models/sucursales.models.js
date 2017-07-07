var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Empresa = mongoose.model('Empresa');

var sucursalSchema = new Schema({
  nombre: {
    type: String,
    required: 'Ingrese el nombre'
  },
  tipo: {
    type: String,
    enum: ['Departamento', 'Local'],
    required: 'Ingrese el tipo de sucursal'
  },
  empresa: {
    type: Schema.ObjectId,
    ref: 'Empresa',
    required: 'Ingrese la empresa a la que pertenece'
  },
  montoMax: Number,
  codSucursal: {
    type: Number
  },
  numCajas: {
    type: Number,
    default: 0
  }
});

mongoose.model('Sucursal', sucursalSchema);
