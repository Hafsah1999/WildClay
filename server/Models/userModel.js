const { Schema, model } = require("../connection");

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: {type:String, default:"avatar.png"},
  role: {
    type: String,
    default: "user",
  },
});
module.exports = model("user", userSchema);
