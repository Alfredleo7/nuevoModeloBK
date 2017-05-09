var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cajaSchema = new Schema({
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
