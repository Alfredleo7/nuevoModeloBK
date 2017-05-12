exports.index = function(req, res){
  if(!req.session){
    res.render('index');
  }
  res.render('login', {usuario: req.session.usuario});
}
