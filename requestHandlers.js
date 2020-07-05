// 初步完成文件上传缺点是无法创建新文件

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");
function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
  }
  
  function upload(response,request) {
    // console.log(postData, 'postData')
    // const a = querystring.parse(postData)
    // console.log(a, '6666')
    // console.log("Request handler 'upload' was called.");
    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.write("You've sent the text: "+
    // querystring.parse(postData).text);
    // response.end();
    console.log("Request handler 'upload' was called.");
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {


    var readStream=fs.createReadStream(files.upload.path);

    var str='';/*保存数据*/
    var count=0;  /*次数*/
    readStream.on('data',function(chunk){
        str+=chunk;
        count++;

    })

  //读取完成
  readStream.on('end',function(chunk){
      console.log(count);
      console.log(str);
  //     console.log(data, 'data');


  })


  //读取失败
  readStream.on('error',function(err){
      console.log(err);

  })

// 创建一个可写流
var writerStream = fs.createWriteStream('./temp/test.png');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readStream.pipe(writerStream);


      
      // console.log(files.upload.path, 'files.upload.path')
      // fs.createReadStream('../aaa.png', {encoding: 'utf8'})
      // .pipe(fs.writerStream.write('./temp/bbb.png','UTF8'))
      // .on('error', function(e){  
      //   console.log(123)
      //   console.error(e)
      // })
    //   console.log("parsing done");
    //   // fs.renameSync(files.upload.path, "/tmp/test.png");
    //   // console.log(files.upload.path, 'files.upload.path')
    //   var is = fs.createReadStream(files.upload.path);
    //   is.on("err",()=>{
    //     console.log("发生错误")
    // });
    // is.on('end',()=>{ //文件读取完毕后触发
    //     console.log("读取完毕");
    // });
    // is.on("close",()=>{ //最后文件关闭触发
    //     console.log("关闭")
    // });
    //   // is.pipe(os);
    //   var os = fs.createWriteStream("./temp/test.png");
    //   os.on("err",()=>{
    //     console.log("发生错误")
    // });
    // os.on('end',()=>{ //文件读取完毕后触发
    //     console.log("读取完毕");
    // });
    // os.on("close",()=>{ //最后文件关闭触发
    //     console.log("关闭")
    // });

      // console.log(is, 'isisis')
   
      // is.on('end',function() {
      //   console.log('end')
      //     fs.unlinkSync("/temp/test.png");
      // });

      /* node.js 0.6 and earlier you can use util.pump:*/
      // util.pump(is, os, function() {
      //     fs.unlinkSync('source_file');
      // });
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br/>");
      response.write("<img src='/show' />");
      response.end();
    });
  }

  function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./temp/test.png", "binary", function(error, file) {
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
      }
    });
  }
  
  exports.start = start;
  exports.upload = upload;
  exports.show = show;
