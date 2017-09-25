'use strict';

var mongoose = require('mongoose');
var Proveedor = mongoose.model('Proveedor');

var getErrorMessage = function(err) {
  // Definir la variable de error message
  var message = '';

  // Si un error interno de MongoDB ocurre obtener el mensaje de error
  if (err.code) {
    switch (err.code) {
      // Si un eror de index único ocurre configurar el mensaje de error
      case 11000:
      case 11001:
        message = 'El Proveedor ya se encuentra registrado';
        break;
      // Si un error general ocurre configurar el mensaje de error
      default:
        message = 'Error de servidor desconocido';
    }
  } else {
    // Grabar el primer mensaje de error de una lista de posibles errores
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Devolver el mensaje de error
  return message;
};

exports.create = function(req, res) {
  var proveedorReq = new Proveedor(req.body);


  if(!proveedorReq.ruc){
    Proveedor.findOne({cedula: proveedorReq.cedula}).exec(function(err, proveedor){
      if(proveedor){
        console.log('ya existe cédula');
        console.log(proveedor);
        res.status(400).send({
          message: 'El proveedor con cédula ya existe'
        });
      } else {
        proveedorReq.save(function(err, newProveedor){
          console.log('guarda primera');
          if(err){
            res.status(400).send({
              message: getErrorMessage(err)
            })
          } else {
            res.json(newProveedor);
          }
        });
      }
    })
  } else {
    if(!proveedorReq.cedula){
      Proveedor.findOne({ruc: proveedorReq.ruc}).exec(function(err, proveedor){
        if(proveedor){
          console.log('existe con ruc');
          console.log(proveedor);
          res.status(400).send({
            message: 'El proveedor con ruc ya existe'
          });
        } else {
          proveedorReq.save(function(err, newProveedor){
            console.log('guarda segunda');
            if(err){
              res.status(400).send({
                message: getErrorMessage(err)
              })
            } else {
              res.json(newProveedor);
            }
          });
        }
      })
    } else {
      Proveedor.findOne({$or: [{ruc: proveedorReq.ruc},{cedula: proveedorReq.cedula}]}).exec(function(err, proveedor){
        if(proveedor){
          console.log('existe con ambos');
          console.log(proveedor);
          res.status(400).send({
            message: 'El proveedor ya existe'
          });
        } else {
          proveedorReq.save(function(err, newProveedor){
            console.log('guarda tercera');
            if(err){
              res.status(400).send({
                message: getErrorMessage(err)
              })
            } else {
              res.json(newProveedor);
            }
          });
        }
      })
    }
  }

  /*if(!proveedorReq.cedula){
    Proveedor.findOne({ruc: proveedorReq.ruc}).exec(function(err, proveedor){
      if(proveedor){
        console.log('existe con ruc');
        console.log(proveedor);
        res.status(400).send({
          message: 'El proveedor con ruc ya existe'
        });
      } else {
        proveedorReq.save(function(err, newProveedor){
          console.log('guarda segunda');
          if(err){
            res.status(400).send({
              message: getErrorMessage(err)
            })
          } else {
            res.json(newProveedor);
          }
        });
      }
    })
  }

  Proveedor.findOne({$or: [{ruc: proveedorReq.ruc},{cedula: proveedorReq.cedula}]}).exec(function(err, proveedor){
    if(proveedor){
      console.log('existe con ambos');
      console.log(proveedor);
      res.status(400).send({
        message: 'El proveedor ya existe'
      });
    } else {
      proveedorReq.save(function(err, newProveedor){
        console.log('guarda tercera');
        if(err){
          res.status(400).send({
            message: getErrorMessage(err)
          })
        } else {
          res.json(newProveedor);
        }
      });
    }
  })*/


  /*var noExiste = true

  if(proveedorReq.ruc && proveedorReq.ruc != ''){
    console.log('tiene ruc')
    Proveedor.findOne({ruc: proveedorReq.ruc}, function(err, proveedor){
      if(proveedor){
        noExiste = false;
        console.log('exite con ruc');
      }
    })
  } else {
    if(proveedorReq.cedula && proveedorReq.cedula != ''){
      console.log('tiene cedula')
      Proveedor.findOne({cedula: proveedorReq.cedula}, function(err, proveedor){
        if(proveedor){
          noExiste = false;
          console.log('exite con cedula');
        }
      })
    }
  }
  if(proveedorReq.cedula && proveedorReq.cedula != ''){
    console.log('tiene cedula')
    Proveedor.findOne({cedula: proveedorReq.cedula}, function(err, proveedor){
      if(proveedor){
        noExiste = false;
        console.log('exite con cedula');
      }
    })
  }

  console.log(noExiste);

  if(noExiste){
    proveedorReq.save(function(err, proveedor){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        })
      } else {
        return res.json(proveedor);
      }
    });
  } else {
    return res.status(400).send({
      message: 'El proveedor ya existe'
    });
  }*/

  /*Proveedor.findOne({ruc: proveedorReq.ruc}, function(err, proveedor){
    if(proveedor){
      return res.status(400).send({
        message: 'El proveedor ya existe con ruc'
      });
    } else {
      Proveedor.findOne({cedula: proveedorReq.cedula}, function(err, proveedor){
        if(proveedor){
          return res.status(400).send({
            message: 'El proveedor ya existe con ced'
          });
        } else {
          proveedorReq.save(function(err){
            if(err){
              return res.status(400).send({
                message: getErrorMessage(err)
              })
            } else {
              return res.json(proveedor);
            }
          });
        }
      })
    }
  })*/

  /*if(proveedor.ruc){
    Proveedor.findOne({ruc: proveedor.ruc}, function(err, proveedor){
      if(proveedor){
        existeConRuc = true;
      }
    })
  }
  if(proveedor.cedula){
    Proveedor.findOne({cedula: proveedor.cedula}, function(err, proveedor){
      if(proveedor){
        existeConCedula = true;
      }
    })
  }
  if(!existeConRuc || !existeConCedula){
    proveedor.save(function(err){
      if(err){
        return res.status(400).send({
          message: getErrorMessage(err)
        })
      } else {
        return res.json(proveedor);
      }
    });
  } else {
    return res.status(400).send({
      message: 'El proveedor ya existe'
    });
  }*/

};

exports.list = function(req, res){
  Proveedor.find({},null,{sort: { nombre: 1}}, function(err, proveedores){
    if(err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(proveedores);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.proveedor);
};

exports.delete = function(req, res){
  var proveedor = req.proveedor;

  proveedor.remove(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      res.json(proveedor);
    }
  });
};

exports.proveedorByID = function(req, res, next, id){
  Proveedor.findById(id, function(err, proveedor){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      })
    } else {
      if(!proveedor){
        return res.status(404).send({
          message: 'No existe el proveedor'
        })
      }
      req.proveedor = proveedor;
      next();
    }
  });
};

exports.update = function(req, res){
  var proveedor = req.proveedor;

  proveedor.nombre = req.body.nombre;
  proveedor.apellido = req.body.apellido;
  proveedor.ruc = req.body.ruc;
  proveedor.cedula = req.body.cedula;
  proveedor.razons = req.body.razons;

  proveedor.save(function(err){
    if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(proveedor);
		}
  })
};

//Metodo arreglar los proveedores en la razon social '.'
exports.arreglarProveedores = function(req, res){
  Proveedor.find(function(err, proveedores){
    var _proveedores = [];
    for(var i in proveedores){
      if(proveedores[i].razons == 'LIMPATEC'){
        proveedores[i].razons = '';
        if(proveedores[i].nombre != '.'){
          proveedores[i].razons = proveedores[i].razons + proveedores[i].nombre+' ';
        }
        if(proveedores[i].apellido != '.'){
          proveedores[i].razons = proveedores[i].razons + proveedores[i].apellido;
        }
        if(proveedores[i].razons != 'LIMPATEC'){
          Proveedor.findById(proveedores[i]._id,function(err, proveedor){
            proveedor.razons = proveedores[i].razons;
            proveedor.save();
          })
        }
      }
    }
    res.status(200).json(_proveedores);
  })
}
