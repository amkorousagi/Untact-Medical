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

const port = 3000
const cors = require("cors")
express = require('express'),
app = express();
app.use(cors())
indexRoute = require("./routes/index")
const loginRouter = require("./routes/login")
const joinRouter = require("./routes/join")
const middleware = require("./utils/middleware")

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
app.use(middleware.tokenExtractor)
app.use("/join", joinRouter)
app.use("/login", loginRouter)

app.use("/", middleware.userExtractor,indexRoute);


app.listen(port,()=> {
    console.log('Example app listening on port',port);
});