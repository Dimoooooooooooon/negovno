import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, required: true},
  cart: {type: Array, required: true},
  id: { type: String },
});

var getUser = mongoose.model('User', userSchema);

export default getUser;