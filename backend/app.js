
const express = require('express')
const cors = require("cors")
app = express();
app.use(cors());
indexRoute = require("./routes/index");
bodyParser = require("body-parser");



app.use(bodyParser.json());
app.use("/",indexRoute);


app.listen(3001 ,()=> {
    console.log('Example app listening on port',3001);
});
