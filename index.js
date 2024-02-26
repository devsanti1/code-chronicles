import express from "express"
import session from "express-session"
import morgan from "morgan"
import dotenv from "dotenv"
import helmet from "helmet"
import { connectDB } from "./mongoose.js"

dotenv.config()
connectDB()
express()
  .set('view engine', 'ejs')
  .use(session({ resave: true, saveUninitialized: false, secret: process.env.SESSION_SECRET }))
  .use(helmet())
  .use(morgan("dev"))
  .listen(process.env.HOST, () => { console.log(`Server started in: http://127.0.0.1:${process.env.HOST}`) })