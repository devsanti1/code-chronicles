import express from "express";

export default express()
  .get('/create', (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/login")
    } else {
      next()
    }
  })
  .get('/edit', (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/profile")
    } else {
      next()
    }
  })
  .get('/register', (req, res, next) => {
    if (req.session.user) {
      res.redirect("/profile")
    } else {
      next()
    }
  })
  .get('/login', (req, res, next) => {
    if (req.session.user) {
      res.redirect("/profile")
    } else {
      next()
    }
  })