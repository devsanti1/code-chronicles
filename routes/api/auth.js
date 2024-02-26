import { Router } from "express";

export default Router()
  .post('/register', async (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .post('/login', async (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .get('/logout', async (req, res) => {
    res.send(req.method + " " + req.url)
  })

