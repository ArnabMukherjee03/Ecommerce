const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  gender:{
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a username"],
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  phoneno:{
    type: String
  },
  orders: {
    type: [mongoose.Schema.Types.Mixed],
  },
});

const User = mongoose.model("users", userSchema);

exports.User = User;
