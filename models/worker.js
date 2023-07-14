import mongoose from "mongoose";

const workerSchema = mongoose.Schema({
  name: String,
  lname: String,
  fname: String,
  sex: String,
  paw: String,
  exp: String,
  wtime: String,
  pay: String,
  id: { type: String },
});

var WorkerMessage = mongoose.model('worker', workerSchema);

export default WorkerMessage;