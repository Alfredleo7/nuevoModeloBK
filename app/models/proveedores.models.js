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
    type: String
  },
  cedula: {
    type: String
  },
  razons: {
    type: String
  }
});

mongoose.model('Proveedor', proveedorSchema);
