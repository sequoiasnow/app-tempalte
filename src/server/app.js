'use strict'
// Create an run an express server that will attach static files over the http
// protocol. Any requested file will be located in /static.
//
// The default served file is index.html
//
// More information on serving static files with express can be found here:
//  http://www.fullstacktraining.com/articles/how-to-serve-static-files-with-express
//
const express = require('express');
const path    = require('path');

let app  = express();

// Define the port to run on
app.set('port', 3000);

// Define where the static folder is.
const staticFolder = path.join(path.resolve(__dirname, '..', '..'), 'static');

// Define the static files to use
app.use(express.static(staticFolder));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log(`Running server on port ${port}`);
});
