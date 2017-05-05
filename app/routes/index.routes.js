var index = require('../controllers/index.controllers');

module.exports = function(app){
  app.route('/').get(index.index);
};
