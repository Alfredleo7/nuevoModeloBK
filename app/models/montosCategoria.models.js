var mongoose = require('mongoose');
var Categoria = mongoose.model('Categoria');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');

var Schema = mongoose.Schema;

var montoCategoriaSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  categoria: {
    type: Schema.ObjectId,
    ref: 'Categoria',
    required: true
  },
  empresa: {
    type: Schema.ObjectId,
    ref: 'Empresa',
    required: true
  },
  sucursal: {
    type: Schema.ObjectId,
    ref: 'Sucursal',
    required: true
  },
  montos: [{
    destinadoA: {
      type: String,
      required: 'El campo destinado es obligatorio'
    },
    monto: {
      type: Number,
      required: 'El monto es obligatorio'
    }
  }],
  montoMax: {
    type: Number
  }
});

montoCategoriaSchema.pre('save', function(next){
  if(!this.montos){
    this.montoMax = 0;
    this.montos = [];
  } else {
    this.montoMax = 0;
    for(var i in this.montos){
      this.montoMax = Number(this.montos[i].monto) + Number(this.montoMax);
    }
  }
  next();
})

mongoose.model('MontoCategoria', montoCategoriaSchema);
