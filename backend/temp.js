var authUser = function (db, StudyID, callback) {
    console.log("StudyID :" +StudyID.toString())
    var studyid = database.collection("StudyID")
  
    var result = studyid.find({ StudyID: StudyID })
  
    result.toArray(function (err, docs) {
      if (err) {
        callback(err, null)
        return
      }
  
      if (docs.length > 0) {
        console.log("find StudyID [ " + docs + " ]")
        for(i=1;i<=docs[0].NumberOfImg;i++){
            callback(null, docs[0].StudyID.toString+i.toString)
        }
      } else {
        console.log("can not find StudyID [ " + docs + " ]")
        callback(null, null)
      }
    })
  }
  router.post("/test", (req, res, next) => {
    console.log(req.body)
    authUser(database, req.body.StudyID, function (err, docs) {
      if (database) {
        if (err) {
          console.log("Error!", err)
          return
        }
        if (docs) {
          console.log("docs",docs)
        } else {
          console.log("empty error")
        }
      } else {
        console.log("DB 연결 x")
      }
    })
  })