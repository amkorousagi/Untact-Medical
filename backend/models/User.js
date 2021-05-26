const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Email: { type: String, unique : true, required: true },
    Password: { type: String, required: true },
    DoctorName :{ type: String, required: true },
    Role :{ type: String, required: true },
    AffiliatedHospital :{ type: String, required: true },
    //isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User",UserSchema);
