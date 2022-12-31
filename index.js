var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?", (req, res) => {
  const givenDate = req.params.date;
  let date;

  // check if no date provided
  if (!givenDate) {
    date = new Date();
  } else {
    // check if unix time:
    //    number string multiplied by 1 gives this number, data string gives NaN
    const checkUnix = givenDate * 1;
    date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix);
  }

  //check if valid format
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});
// app.get("/api/:date?", function (req, res) {
//   let isValidDate = Date.parse(req.params.date);
//   if (isNaN(isValidDate)) {
//   // when is not valid date logic
//   return false;
//   }
//   const str = isValidDate;
//   const [dateComponents, timeComponents] = str.split(' ');
//   const [day, month, year] = dateComponents.split('/');
//   const [hours, minutes, seconds] = timeComponents.split(':');

// const date1= new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
// console.log(date1);

//   res.json({unix: date});
//   console.log(date);
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
