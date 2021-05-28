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

const port = 3001
const cors = require("cors")
const express = require("express")
const app = express()
const config = require("./utils/config")
const indexRoute = require("./routes/index")
const loginRouter = require("./routes/login")
const joinRouter = require("./routes/join")
const studyRouter = require("./routes/study")
const showRouter = require("./routes/show")
const readoutRouter = require("./routes/readout")
const initRouter = require("./routes/init")
const doctorRouter = require("./routes/doctor")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require('mongoose')
const { use } = require("./routes/study")

mongoose
  .connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB")

  })
  .catch((err) => {
    logger.error("error connecting to MongoDB:", err.message)
  })

//use routes
app.use(cors())
app.use(express.json())
app.use("/test",(req,res)=>{
  res.end({body:"mytest"})

})
app.use("/join", joinRouter)
app.use("/login", loginRouter)
app.use("/init",initRouter)

app.use("/show",showRouter)
//인증 정보, req.token req.user 채움
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use("/study",studyRouter)
app.use("/readout",readoutRouter)
app.use("/doctor",doctorRouter)

app.listen(port,"0.0.0.0", () => {
  console.log("Example app listening on port", port)
})

//token
/* 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEb2N0b3JOYW1lIjoicHNjIiwiaWQiOiI2MDhlNTUyMDc5NjkwZDFiMDQ2NGRkZmUiLCJpYXQiOjE2MTk5NDQxMzksImV4cCI6MTYxOTk0NzczOX0.0xxQfinxIwGNabkiGGbBs__V73whfh2k_p6FdQNT-Zw
*/
