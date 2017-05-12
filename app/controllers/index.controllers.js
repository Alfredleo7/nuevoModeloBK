exports.index = function(req, res){
  if(!req.session.usuario){
    res.render('login');
  }
  console.log(req.session.usuario);
  res.render('index', {usuario: req.session.usuario});
}
