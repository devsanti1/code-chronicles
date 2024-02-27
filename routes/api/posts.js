import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";

export default Router()
  .get('/', async (req, res) => {
    let posts = await (models.Post.find())
    posts.map(x => {
      x.title = decodeURIComponent(x.title)
      x.content = decodeURIComponent(x.content)
      x.author = decodeURIComponent(x.author)
    })
    res.status(200).json(posts)
  })
  .get('/:id', async (req, res) => {
    try {
      let post = await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))
      post.title = decodeURIComponent(post.title)
      post.content = decodeURIComponent(post.content)
      post.author = decodeURIComponent(post.author)
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({})
    }
  })
  .get('/author/:username', async (req, res) => {
    try {
      let posts = await models.Post.find({ author: encodeURIComponent(req.params.username) })
      posts.map(x => {
        x.title = decodeURIComponent(x.title)
        x.content = decodeURIComponent(x.content)
        x.author = decodeURIComponent(x.author)
      })
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({})
    }
  })
  .get('/author/:username/info', async (req, res) => {
    const author = await models.User.findOne({ username: encodeURIComponent(req.params.username) }, "username email date_created")
    author.username = decodeURIComponent(author.username)
    author.email = decodeURIComponent(author.email)
    res.status(200).json(author)
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