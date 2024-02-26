import { Router } from "express";

export default Router()
  .get('/', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .post('/', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .delete('/:commentId', (req, res) => {
    res.send(req.method + " " + req.url)
  })