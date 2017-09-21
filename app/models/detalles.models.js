var mongoose = require('mongoose');
var Caja = mongoose.model('Caja');
var Proveedor = mongoose.model('Proveedor');
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
    type: String,
    required: 'Llene el campo Entregado'
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
  administrador:{
    type: Schema.ObjectId,
    ref: "Usuario"
  },
  tipo: {
    type: String,
    enum: ['factura', 'vale']
  },
  anexo: {
    proveedor: {
      nombre: {
        type: String
      },
      apellido: {
        type: String
      },
      ruc: {
        type: String
      },
      cedula: {
        type: String
      },
      razons: {
        type: String
      }
    },
    fac_establecimiento: String,
    fac_puntoEmision: String,
    fac_secuencia: String,
    fac_autorizacion: String,
    retencion: {
      type: Boolean,
      default: false
    },
    ret_establecimiento: String,
    ret_puntoEmision: String,
    ret_secuencia: String,
    ret_autorizacion: String,
    subTotal0: {
      type: Number,
      default: 0
    },
    subTotalIva: {
      type: Number,
      default: 0
    },
    selectRetencion: String,
    retencionIVABienes: Number,//30%
    retencionSubTotalBienes: Number,
    retencionIVAServicios: Number,//70%
    retencionSubTotalServicios: Number,
    retencionIVAcien: Number,
    retencionSubTotalOcho: Number,
    totalRetencion: Number,
    iva: Number,
    tasasYPropinas: Number,
    total: Number
  },
  estado: {
    type: String,
    enum: ['Borrador','Pendiente','Aprobado', 'Rechazado'],
    default: 'Borrador',
    required: true
  }
});

mongoose.model('Detalle', detalleSchema);
