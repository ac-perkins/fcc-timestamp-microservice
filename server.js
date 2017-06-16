// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
var moment = require('moment');
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", (req, res) => {
  const resDay = {};
  let date;
  
  if (Number(req.params.time)) {
    date = new Date( Number(req.params.time) );
  } else {
    date = new Date(req.params.time) / 1000;
  }

  if (isNaN(date)) {
    resDay.unix = null;
    resDay.natural = null
  } else {
    date = moment.unix(date);
    resDay.unix = date.format('X');
    resDay.natural = date.format('MMMM Do YYYY');
  }
  res.send(resDay);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
