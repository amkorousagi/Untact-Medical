var http = require('http');                 //웹서버 기능을 담당하기 위한 모듈
var server = http.createServer();           //서버 객체를 얻어옴
var fs = require('fs');
const open = require('open');
 
//서버에서 대기하기 위한 처리
var localHost = 'localhost';
var port = 3000;
var backLog = 50000;    //  동시에 접속 할 수 있는 클라이언트 수
server.listen(port, localHost, backLog,
    function () {
        console.log('웹서버 실행 :' + localHost + ':' + + port);
    }
);
 
 
server.on('connection',
    function (socket) {
        console.log('클라이언트 접속');
    }
);
 
 
server.on('request',
    function (req, res) {
        console.log('클라이언트 요청');
        //consloe.dir(req);
 
 
        var filename = 'UI.png';
        fs.readFile(filename,              //파일 읽기
            function (err, data)
            {
                //http의 헤더정보를 클라이언트쪽으로 출력
                //image/jpg : jpg 이미지 파일을 전송한다
                //write 로 보낼 내용을 입력
                res.writeHead(200, { "Context-Type": "image/png" });//보낼 헤더를 만듬
                res.write(data);   //본문을 만들고
                res.end();  //클라이언트에게 응답을 전송한다
 
            }
        );
 
    }
);
open('http://localhost:3000')



