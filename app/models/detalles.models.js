var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');
var Schema = mongoose.Schema;

var detalleSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  valor: Number,
  empresa: {
    type: String
  },
  categoria: {
    type: String
  },
  entregado: {
    type: String
  },
  cargado: {
    type: String
  },
  fecha: {
    type: Date
  },
  descripcion: {
    type: String
  },
  caja: {
    type: Schema.ObjectId,
    ref: "Caja"
  },
  creador: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: "Se necesita el id del Usuario"
  },
  tipo: {
    type: String,
    enum: ['factura', 'vale']
  },
  anexo: {
    fac_establecimiento: String,
    fac_departamento: String,
    fac_secuencia: String,
    fac_autorizacion: String,
    iva: Number,
    subTotal: Number,
    total: Number,
    ret_establecimiento: String,
    ret_departamento: String,
    ret_secuencia: String,
    ret_autorizacion: String
  }
});

mongoose.model('Detalle', detalleSchema);
