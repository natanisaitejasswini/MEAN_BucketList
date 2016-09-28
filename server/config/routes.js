console.log('routes');
var user = require('../controllers/users');
var task = require('../controllers/tasks');

module.exports = function(app){
	app.get('/users',user.index)
	app.post('/user', function(req, res){
		console.log('ROUTEs', req);
		user.create(req,res)
	})
	// Using this at login to check whether name is present or not
	app.get('/user/:name',user.show)

	//Task Creation routes
	app.get('/user_id/:id',user.show_id)
	app.post('/task', task.create)
	app.get('/tasks',task.index)
	
	// Playing between selecting and deselecting between check boxes
  	app.post('/complete/:id', task.switch_complete)
}
