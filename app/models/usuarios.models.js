var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
    enum: ['General', 'Administrador', 'Gerente'],
    default: 'General'
  },
  empresa: {
    type: String,
    required: 'Elija una Empresa'
  },
  sucursal:{
    nombre: {
      type: String,
      required: 'Elija un Local/Departamento'
    },
    tipo: String
  }
});

userSchema.pre('save', function(next){
  this.password = crypto.encriptar(this.password);
  next();
});


mongoose.model('Usuario', userSchema);
