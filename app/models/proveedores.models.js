'use strict';

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
    type: String/*,
    match: [/\d{13}/, 'Ruc nó válido, ingrese 13 números']*///SOLO 13 NUMEROS
  },
  cedula: {
    type: String/*,
    match: [/\d{10}/, 'Cédula nó válida, ingrese 10 números']*///SOLO 10 NUMEROS
  },
  razons: {
    type: String,
    required: 'Ingrese Razón Social'
  }
});


mongoose.model('Proveedor', proveedorSchema);
