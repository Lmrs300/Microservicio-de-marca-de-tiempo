// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  if(req.params.date){
    const date=req.params.date

    
    if(date.includes("-")){
      let dateObj=new Date(date)
      if (dateObj.toString() === "Invalid Date") {
       
        res.json({error:"Invalid Date"})
      }else{
        var unix=new Date(date).getTime()
        var utc=new Date(date).toUTCString()
        res.json({unix:unix,utc:utc})
      }
    }else{
      if (/\d{5,}/.test(date) && Number(date)) {
        var unix=Number(date)
        var utc=new Date(Number(date)).toUTCString()
        res.json({unix:unix,utc:utc})
      }else{
        res.json({error:"Invalid Date"})
      }
    }

  
      
  }else{
    const unix=new Date().getTime()
    const utc=new Date().toUTCString()
    res.json({unix:unix,utc:utc})
  }
 
  
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
