var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  montoMax: Number
});

mongoose.model('Sucursal', sucursalSchema);
