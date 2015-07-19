
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CRUD with Node Express & Mongo' });
};
