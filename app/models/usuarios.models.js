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
    required: 'Escriba su nombre'
  },
  lastName: {
    type: String,
    required: 'Escriba su apellido'
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Por favor escriba una dirección de correo válida"],
    required: 'Ingrese el correo electrónico',
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
  }
});

userSchema.pre('save', function(next){
  this.password = crypto.encriptar(this.password);
  next();
});


mongoose.model('Usuario', userSchema);
