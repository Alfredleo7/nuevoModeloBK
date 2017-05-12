exports.index = function(req, res){
  if(!req.session.usuario){
    res.render('login');
  }

  if(req.session.usuario.tipo === 'General'){
    res.render('index', {usuario: req.session.usuario});
  }

  if(req.session.usuario.tipo === 'Administrador'){
    res.status(200).send({
      message: 'Administrador logueado correctamente'
    });
  }

  if(req.session.usuario.tipo === 'Gerente'){
    res.status(200).send({
      message: 'Gerente logueado correctamente'
    });
  }

};
