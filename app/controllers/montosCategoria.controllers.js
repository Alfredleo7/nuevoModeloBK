var mongoose = require('mongoose');
var Categoria = mongoose.model('Categoria');
var Empresa = mongoose.model('Empresa');
var Sucursal = mongoose.model('Sucursal');
var MontoCategoria = mongoose.model('MontoCategoria');

var getErrorMessage = function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.listByCategoria = function(req, res){
  MontoCategoria.find({categoria:req.params.categoriaId},function(err, montosCategoria){
    if(err){
      return res.status(500).send({
        message: getErrorMessage()
      })
    } else {
      if (montosCategoria.length != 0) {
        Empresa.populate(montosCategoria, {path: 'empresa'}, function(err, montosCategoria){
          Sucursal.populate(montosCategoria, {path: 'sucursal'}, function(err, montosCategoria){
            Categoria.populate(montosCategoria, {path: 'Categoria'}, function(err, montosCategoria){
              return res.status(200).json(montosCategoria);
            })
          })
        })
      } else {
        return res.status(200).json(montosCategoria);
      }
    }
  });
};

exports.create = function(req, res){
  var montoCategoria = new MontoCategoria(req.body);
  MontoCategoria.find({
    $and: [
      { categoria: montoCategoria.categoria },
      { sucursal: montoCategoria.sucursal }
    ]
  }, function(err, montos){
    if(montos.length == 0){
      montoCategoria.save(function(err, montoCategoria){
        if(err) {
          res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          Empresa.findById(montoCategoria.empresa,'nombre',function(err, empresa){
            montoCategoria.empresa = empresa;
            Sucursal.findById(montoCategoria.sucursal, 'tipo nombre', function(err, sucursal){
              montoCategoria.sucursal = sucursal;
              res.json(montoCategoria);
            })
          })
        }
      });
    } else {
      return res.status(500).send({
        message: 'Ya se estableció el monto máximo para este Dep/Local'
      })
    }
  })

};

exports.delete = function(req, res){
  MontoCategoria.findByIdAndRemove(req.params.montoId, function(err, montoCategoria){
    if(err){
      res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.status(200).json(montoCategoria);
    }
  });
};

exports.update = function(req, res){
  MontoCategoria.findById(req.params.montoId, function(err, montoCategoria){
    if(err){
      res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      montoCategoria.montoMax = req.body.montoMax;

      montoCategoria.save(function(err, montoCategoria){
        if(err) {
          res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          Empresa.findById(montoCategoria.empresa,'nombre',function(err, empresa){
            montoCategoria.empresa = empresa;
            Sucursal.findById(montoCategoria.sucursal, 'tipo nombre', function(err, sucursal){
              montoCategoria.sucursal = sucursal;
              res.json(montoCategoria);
            })
          })
        }
      });

    }
  })
}

exports.deleteByCategoria = function(req, res){
  MontoCategoria.remove({categoria: req.params.categoriaId}, function(err){
    if(err) {
      res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.status(200).send({
        message: 'Se eliminaron los montos de ésta categoria'
      })
    }
  });
}
