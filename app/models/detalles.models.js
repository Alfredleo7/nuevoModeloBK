var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');
var Schema = mongoose.Schema;

var detalleSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  valor: {
    type: Number,
    required: 'Ingrese el valor del Detalle'
  },
  categoria: {
    type: String,
    required: 'Elija una Categoria'
  },
  entregado: {
    type: String
  },
  cargado: {
    type: String,
    required: 'Elija una Sucursal'
  },
  fecha: {
    type: Date,
    required: 'Eija una fecha'
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
    proveedor: String,
    ruc: String,
    ced: String,
    fac_establecimiento: String,
    fac_puntoEmision: String,
    fac_secuencia: String,
    fac_autorizacion: String,
    retencion: Boolean,
    ret_establecimiento: String,
    ret_puntoEmision: String,
    ret_secuencia: String,
    ret_autorizacion: String,
    subTotal: Number,
    iva: Number,
    total: Number
  }
});

mongoose.model('Detalle', detalleSchema);
