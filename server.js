var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'), 
    root     = __dirname,
    port     = process.env.PORT || 8000,
    mongoose = require( 'mongoose' ),
    app      = express();


app.use(express.static(path.join(__dirname, "./client")));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json())
app.use(bp.urlencoded())
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);


app.listen( 8000, function() {
  console.log( 'server running on port 8000' );
});
