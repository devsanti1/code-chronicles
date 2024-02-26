import express from "express";

export default express()
  .post('/auth/*', (req, res, next) => {
    if (req.session.user) {
      res.redirect("/profile")
    } else {
      next()
    }
  })
  .post('/posts', (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  })
  .put('/posts/*', (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  })
  .delete('/posts/*', (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  })
  .post('/posts/*/comments', (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  })
  .delete('/posts/*/comments/*', (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  })