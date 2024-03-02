import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import bcrypt from "../../utils/bcrypt.js";
import { patterns, toMoment } from "../../utils/validation.js";

export default Router()
  .post('/register', async (req, res) => {
    const date = new Date()
    const user = {
      username: req.body.username.toLowerCase().trim().replace(" ", ""),
      email: req.body.email.trim().replace(" ", ""),
      password: req.body.password,
      date_created: toMoment(date)
    }
    if (!patterns.username.test(user.username)) {
      req.session.message = "incorrect username"
      res.status(409).redirect("/register")
    } else if (!patterns.email.test(user.email)) {
      req.session.message = "incorrect email"
      res.status(409).redirect("/register")
    } else if (!patterns.password.test(user.password)) {
      req.session.message = "incorrect password"
      res.status(409).redirect("/register")
    } else {
      user.password = await bcrypt.generateHash(user.password)
      const usernames = await models.User.find({ "username": encodeURIComponent(user.username) }, "username")
      const emails = await models.User.find({ "email": encodeURIComponent(user.email) }, "email")
      if (usernames.length > 0) {
        req.session.message = "used username"
        res.status(409).redirect("/register")
      } else if (emails.length > 0) {
        req.session.message = "used email"
        res.status(409).redirect("/register")
      }
      else {
        try {
          await (new models.User({
            username: encodeURIComponent(user.username),
            email: encodeURIComponent(user.email),
            password: user.password,
            date_created: toMoment(user.date_created)
          })).save()
          req.session.user = user
          req.session.message = "Registrado con exito"
          res.status(201).redirect("/")
        } catch (error) {
          res.status(500).send(error)
        }
      }
    }
  })
  .post('/login', async (req, res) => {
    const data = {
      email: encodeURIComponent(req.body.email.trim().replace(" ", "")),
      password: req.body.password,
    }
    let user = await models.User.findOne({ email: data.email })
    if (user && await bcrypt.compareHash(data.password, user.password)) {
      user = user.toJSON()
      req.session.user = {
        username: decodeURIComponent(user.username),
        email: decodeURIComponent(user.email),
        password: user.password,
        date_created: toMoment(user.date_created)
      }
      req.session.message = "Logeado con exito"
      res.status(200).redirect("/")
    } else {
      req.session.message = "datos incorrectos"
      res.status(401).redirect("/login")
    }
  })
  .get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect("/")
  })

