
// const express = require('express')
// const cors = require("cors")
// app = express();
// app.use(cors());
// indexRoute = require("./routes/index");
// bodyParser = require("body-parser");



// app.use(bodyParser.json());
// //app.use('/',)
// app.use("/",indexRoute);


// app.listen(3001 ,()=> {
//     console.log('Example app listening on port',3001);
// });

const port = 3000,
express = require('express'),
app = express();
indexRoute = require("./routes/index");

//const mongoose = require('mongoose');
// DB연결
// let url =  "mongodb://localhost:27017/dalhav";
// mongoose.connect(url, {useNewUrlParser: true});


bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//뷰엔진 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//use routes
app.use("/",indexRoute);

app.listen(port,()=> {
    console.log('Example app listening on port',port);
});

