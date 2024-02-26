import { Router } from "express";

export default Router()
  .get('/', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .get('/:id', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .post('/', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .put('/:id', (req, res) => {
    res.send(req.method + " " + req.url)
  })
  .delete('/:id', (req, res) => {
    res.send(req.method + " " + req.url)
  })