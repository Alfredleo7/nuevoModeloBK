var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var config = require('./config');
var methodOverride = require('method-override');
var session = require('express-session');
var favicon = require('serve-favicon');


module.exports = function(){
  var app = express();

  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  } else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    secret : config.sessionSecret,
    resave : true,
    saveUninitialized : false
  }));

  app.use(favicon('./public/favicon_23Q_icon.ico'));

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  require('../app/routes/usuarios.routes')(app);
  require('../app/routes/cajas.routes')(app);
  require('../app/routes/detalles.routes')(app);
  require('../app/routes/sucursales.routes')(app);
  require('../app/routes/categorias.routes')(app);
  require('../app/routes/proveedores.routes')(app);
  require('../app/routes/empresas.routes')(app);

  app.use(express.static('./public'));

  return app;
}
