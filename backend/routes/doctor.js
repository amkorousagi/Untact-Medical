const doctorRouter = require("express").Router()
const User = require("../models/User")

doctorRouter.get("/:id", async (req,res)=>{
    console.log("id ", req.params.id)
    const user = await User.findById(req.params.id)
    res.json({DoctorName:user.DoctorName,Role:user.Role,AffiliatedHospital:user.AffiliatedHospital})
})
module.exports = doctorRouter