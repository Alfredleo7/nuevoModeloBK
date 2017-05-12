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
    required: 'El nombre es requerido'
  },
  lastName: {
    type: String,
    require: 'El apellido es requerido'
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"],
    require: 'El email es requerido'
  },
  password: {
    type: String
  },
  tipo: {
    type: String,
    enum: ['General', 'Administrador', 'Gerente'],
    required: 'El tipo de usuario es requerido'
  }
});

userSchema.pre('save', function(next){
  this.password = crypto.encriptar(this.password);
  next();
});


mongoose.model('Usuario', userSchema);
