var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proveedorSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String
  },
  apellido: {
    type: String
  },
  ruc: {
    type: String,
    unique: true
  },
  cedula: {
    type: String,
    unique: true
  },
  razons: {
    type: String
  }
});

mongoose.model('Proveedor', proveedorSchema);
