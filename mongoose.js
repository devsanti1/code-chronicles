import mongoose, { Schema } from "mongoose"
import { v4 as uuid } from "uuid"

const schemas = {
  user: new Schema({
    username: String,
    email: String,
    password: String,
    date_created: Date,
  }),
  post: new Schema({
    title: String,
    content: String,
    author: String,
    date_created: Date,
    date_updated: Date
  }),
  commentary: new Schema({
    post_id: String,
    author: String,
    content: String,
    date_created: Date,
    date_updated: Date
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