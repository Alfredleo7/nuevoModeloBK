var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('../services/crypto.js');

var userSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"],
    require: 'El email es requerido'
  },
  password: String
});

userSchema.pre('save', function(next){
  this.password = crypto.encriptar(this.password);
  next();
});

mongoose.model('Usuario', userSchema);
