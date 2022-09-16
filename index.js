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


app.get("/api/:date",(req, res)=>{
  const date = req.params.date

  if(new Date(date)=='Invalid Date' && 
     new Date(Number(date))=='Invalid Date')
    res.json({ error : "Invalid Date" })
  
  const unix= Number(date) +''=='NaN'? 
    new Date(date).getTime():
    Number(date)
  
  const utc=new Date(unix).toGMTString() 
  res.json({unix , utc})
 
})
app.get("/api/", (req, res)=>{
    res.json({unix: new Date().getTime(), utc:new Date().toGMTString() })
  
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
