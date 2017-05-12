var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Schema = mongoose.Schema;

var cajaSchema = new Schema({
  creador: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: "Se necesita el id del Usuario"
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
    enum: ['Pendiente','Aprobado', 'Rechazado'],
    default: 'Pendiente'
  }
});

mongoose.model('Caja', cajaSchema);
