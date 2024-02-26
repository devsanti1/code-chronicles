import { Router } from "express";
import auth from "./api/auth.js";
import posts from "./api/posts.js";
import comments from "./api/comments.js";
import client from "./client.js";

export default Router()
  .use('/', client)
  .use('/api/auth', auth)
  .use('/api/posts', posts)
  .use('/api/posts', comments)