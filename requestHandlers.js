const exec = require('child_process').exec
const querystring = require("querystring")

function start(response) {
    console.log("Resquest handler 'start' was called.")
    // exec('dir', function(error, stdout, stderr) {
    //     console.log('stdout----', stdout)
    //     response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
    //     response.write(stdout)
    //     response.end()
    // })

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Resquest handler 'upload' was called.")
    response.writeHead(200, {"Content-Type": "text/plain;charset=UTF-8"})
    response.write('You have sent: ' +  postData)
    console.log(querystring.parse(postData))
    response.write('You have sent: ' +  querystring.parse(postData).text)
    response.end()
}

function sleep(milliSeconds) {
  const startTime = new Date().getTime()
  while(new Date().getTime() < startTime + milliSeconds) {}
}


exports.start = start
exports.upload = upload