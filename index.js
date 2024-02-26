import express from "express"
import session from "express-session"
import morgan from "morgan"
import dotenv from "dotenv"
import helmet from "helmet"
import { connectDB } from "./utils/mongoose.js"
import routes from "./routes/routes.js"
import middlewareAPI from "./middlewares/middlewareAPI.js"

dotenv.config()
connectDB()
express()
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(session({ resave: true, saveUninitialized: false, secret: process.env.SESSION_SECRET }))
  .use(helmet())
  .use(morgan("dev"))
  .use('/api', middlewareAPI)
  .use('/', routes)
  .listen(process.env.HOST, () => { console.log(`Server started in: http://127.0.0.1:${process.env.HOST}`) })