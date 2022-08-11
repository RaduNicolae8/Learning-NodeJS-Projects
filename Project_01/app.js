var express = require('express');
var fortune = require('./lib/fortune.js');
var path = require('path');
var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//public middleware
app.use(express.static(path.join(__dirname , '/public')));

//set up port
app.set('port', process.env.PORT || 3000);

//home page
app.get('/', function(req, res){
    res.render('home');
   });

//about page
app.get('/about', function(req, res){
    res.render('about', { fortune: fortune.getFortune() });

    });


// custom 404 page
app.use(function(req, res){
 res.status(404);
 res.render('404');
});


// custom 500 page
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});


app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});