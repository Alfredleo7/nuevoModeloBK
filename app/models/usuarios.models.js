var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');
var crypto = require('../services/crypto.js');

var userSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  firstName:{
    type: String,
    required: 'Escriba su nombre',
    uppercase: true
  },
  lastName: {
    type: String,
    required: 'Escriba su apellido',
    uppercase: true
  },
  usuario: {
    type: String,
    unique: true,
    required: 'Ingrese un usuario',
    lowercase: true
  },
  password: {
    type: String,
    required: 'Ingrese una contraseña'
  },
  tipo: {
    type: String,
    enum: ['General', 'Administrador', 'Super'],
    required: 'La variable tipo es requerida'
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
  }
});

userSchema.pre('save', function(next){
  this.password = crypto.encriptar(this.password);
  next();
});


mongoose.model('Usuario', userSchema);
