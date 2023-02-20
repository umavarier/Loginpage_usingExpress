const { Router } = require('express');
const express = require('express');
const sessions = require('express-session');
const app = express();
const PORT = 8000;



// view engine

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'))



// session management


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});



// login user

const myusername = 'parvathi'
const mypassword = '1234'




// Routers

var session;
app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
    res.render("home", {myusername});
     
  }else{
    if(req.session.message){
      const message = req.session.message;
      res.render('index', {message})
    }else{
      const message = "";
      res.render('index', {message})
    }
  }
});


app.post('/',(req,res) => {

  if(req.body.username != myusername){
    const message = "Enter valid Username"
    req.session['message'] = message;
    res.redirect('/')
  }else if(req.body.password != mypassword){
    const message = "Enter valid password"
    req.session['message'] = message;
    res.redirect('/')
  }
  else{
      session = req.session;
      session.userid = req.body.username;
      console.log(req.session);
      res.redirect('/');
  }
})



app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});





// server


app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));