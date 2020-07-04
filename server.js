
var http = require("http");
var url = require("url");
const querystring = require('querystring');

function start(route,handle) {
    http.createServer(function(request, response) {
      // var pathname = url.parse(request.url).pathname;
      // // var query = url.parse(request.url).query;
      // route(pathname,handle, response)
      // // response.writeHead(200, {"Content-Type": "text/plain"});
      // // response.write(content);
      // // response.end();
      // var postData = "";
      // var pathname = url.parse(request.url).pathname;
      // console.log("Request for " + pathname + " received.");
  
      // request.setEncoding("utf8");
  
      // request.addListener("data", function(postDataChunk) {
      //   // console.log(postDataChunk, 'postDataChunk')
      //   postData += postDataChunk;
      //   console.log("Received POST data chunk '"+
      //   postDataChunk + "'.");
      // });
  
      // request.addListener("end", function() {
      //   route(handle, pathname, response, postData);
      // });
      // route(handle, pathname, response, postData);
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");
      route(handle, pathname, response, request);

  
    }).listen(8888);
}

exports.start = start 