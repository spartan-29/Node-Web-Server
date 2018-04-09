const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// Set view engine
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


// Logger
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

// Serve static files and html files and other middlewares
app.use(express.static(__dirname+'/public'));

// Route Handlers
app.get('/',(req,res)=>{
    res.render('home.hbs',{
      pageTitle : 'Home Page',
      welcomeMessage : 'Welcome to the Home Page'
    });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


// Listen for incoming request
app.listen(port,()=>{
  console.log(`Server running at port ${port}`);
});
