
const port = 3000,
express = require('express'),
app = express();
indexRoute = require("./routes/index");

//const mongoose = require('mongoose');
// DB연결
// let url =  "mongodb://localhost:27017/dalhav";
// mongoose.connect(url, {useNewUrlParser: true});


bodyParser = require("body-parser");
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
