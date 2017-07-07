'use strict';

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Caja = mongoose.model('Caja');

var getErrorMessage = function(err){
  if (err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message){
        return err.errors[errName].message;
      }
    }
  } else {
    return 'Error de servidor desconocido';
  }
};

exports.create = function(req, res){
  var caja = new Caja();
  caja.creador = req.session.usuario.id;
  caja.empresa = req.session.usuario.empresa;
  caja.sucursal = req.session.usuario.sucursal;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(caja);
    }
  });
};

exports.list = function(req, res){
  Caja.find({}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(cajas);
    }
  });
};

exports.read = function(req, res){
  res.json(req.caja);
};

exports.update = function(req, res){
  var caja = req.caja;

  caja.valor = req.body.valor;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(caja);
    }
  });
};

exports.delete = function(req, res){
  var caja = req.caja;

  caja.remove(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(caja);
    }
  });
};

//Cajas por usuario

exports.listByUsuario = function(req, res){
  Caja.find({'creador': req.session.usuario.id, 'estado': req.params.estado}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        res.json(cajas);
      });
    }
  });
};

//Cajas por estado
exports.listPendientes = function(req, res){
  Caja.find({'estado': 'Pendiente'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(cajas);
    }
  });
}

exports.listAprobados = function(req, res){
  Caja.find({'estado': 'Aprobado'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        return res.status(200).json(cajas);
      });
    }
  });
}

exports.listRechazados = function(req, res){
  Caja.find({'estado': 'Rechazado'}, function(err, cajas){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      Usuario.populate(cajas, {path: 'administrador'}, function(err, cajas){
        return res.status(200).json(cajas);
      });
    }
  });
}

exports.aprobar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Aprobado';
  caja.administrador = req.session.usuario.id;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(caja);
    }
  });
};

exports.rechazar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Rechazado';
  caja.administrador = req.session.usuario.id;

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(caja);
    }
  });
};


exports.enviar = function(req, res){
  var caja = req.caja;

  caja.estado = 'Pendiente';

  caja.save(function(err){
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(caja);
    }
  });
};

exports.cajaByID = function(req, res, next, id){
  Caja.findById(id, function(err, caja){
    if (err) return next(err);
    if (!caja){
      return res.status(404).send({
        message: 'La caja no existe'
      })
    }

    Usuario.findById(caja.administrador, function(err, usuario){
      if(usuario){
        caja.administrador = usuario;
      }
      req.caja = caja;
      next();
    });
  });
};
