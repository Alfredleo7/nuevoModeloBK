var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');
var Schema = mongoose.Schema;

var cajaSchema = new Schema({
  creador: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: "Se necesita el id del Usuario"
  },
  administrador:{
    type: Schema.ObjectId,
    ref: "Usuario"
  },
  creado: {
    type: Date,
    default: Date.now
  },
  valor: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['Borrador','Pendiente','Aprobado', 'Rechazado'],
    default: 'Borrador'
  },
  empresa: {
    type: Schema.ObjectId,
    ref: 'Empresa',
    required: 'Ingrese la Empresa a la que pertenece'
  },
  sucursal:{
    type: Schema.ObjectId,
    ref: 'Sucursal',
    required: 'Ingrese el Local/Departamento a la que pertenece'
  },
  secuencial:{
    type: String
  }
});

mongoose.model('Caja', cajaSchema);
