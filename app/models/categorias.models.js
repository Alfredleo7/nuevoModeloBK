var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String,
    require: 'Ingrese el nombre de la categoria'
  }
});

mongoose.model('Categoria', categoriaSchema);
