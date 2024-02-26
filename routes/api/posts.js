import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";

export default Router()
  .get('/', async (req, res) => {
    let posts = await (models.Post.find())
    if (posts.length > 0) {
      posts = posts.toJSON()
    }
    res.status(200).json(posts)
  })
  .get('/:id', async (req, res) => {
    try {
      let post = await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({})
    }
  })
  .post('/', async (req, res) => {
    let post = {
      _id: new mongoose.Types.ObjectId(),
      title: encodeURIComponent(req.body.title),
      content: encodeURIComponent(req.body.content),
      author: encodeURIComponent(req.session.user.username),
      date_created: (new Date()).toJSON(),
      date_updated: (new Date()).toJSON(),
    }
    await (new models.Post(post)).save()
    res.status(200).redirect(`/post/${post._id}`)
  })
  .put('/:id', async (req, res) => {
    try {
      let doc = await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))
      doc.title = encodeURIComponent(req.body.title)
      doc.content = encodeURIComponent(req.body.content)
      doc.date_updated = (new Date()).toJSON()
      await doc.save()
      res.redirect(`/post/${doc._id}`)
    } catch (error) {
      res.redirect(`/post/${req.params.id}`)
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      await models.Post.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
      req.session.message = "Post Borrado exitosamente"
    } catch (error) {
      req.session.message = "Ha ocurrido un error, el post no ha sido borrado"
    }
    res.redirect(`/profile/${req.session.user.username}`)
  })