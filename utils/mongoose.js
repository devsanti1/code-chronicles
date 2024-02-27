import mongoose, { Schema } from "mongoose"

const schemas = {
  user: new Schema({
    username: String,
    email: String,
    password: String,
    date_created: String,
  }),
  post: new Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    content: String,
    author: String,
    date_created: String,
    date_updated: String
  }),
  commentary: new Schema({
    post_id: String,
    author: String,
    content: String,
    date_created: String,
  })
}
const models = {
  User: mongoose.model("User", schemas.user),
  Post: mongoose.model("Post", schemas.post),
  Commentary: mongoose.model("Commentary", schemas.commentary),
}
function connectDB() {
  try {
    mongoose.connect('mongodb://localhost:27017/code-chronicles');
    console.log("Database connected")
  } catch (error) {
    console.error("Error connecting Database", error)
  }
}

export { connectDB, schemas, models }