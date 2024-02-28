import { Router, json } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";
import { myDate, toMoment } from "../../utils/validation.js";

export default Router()
  .get('/', async (req, res) => {
    let posts = (JSON.parse(JSON.stringify(await (models.Post.find())))).sort((a, b) => toMoment(b.date_created) - toMoment(a.date_created))
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
    const date = new Date()
    let post = {
      _id: new mongoose.Types.ObjectId(),
      title: encodeURIComponent(req.body.title),
      content: encodeURIComponent(req.body.content),
      author: encodeURIComponent(req.session.user.username),
      date_created: myDate(date.getDate(), date.getMonth(), date.getFullYear()),
      date_updated: myDate(date.getDate(), date.getMonth(), date.getFullYear())
    }
    await (new models.Post(post)).save()
    res.status(200).redirect(`/post/${post._id}`)
  })
  .post('/put/:id', async (req, res) => {
    const date = new Date()
    try {
      let doc = await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))
      doc.title = encodeURIComponent(req.body.title)
      doc.content = encodeURIComponent(req.body.content)
      doc.date_updated = myDate(date.getDate(), date.getMonth(), date.getFullYear())
      await doc.save()
      res.redirect(`/post/${doc._id}`)
    } catch (error) {
      res.redirect(`/post/${req.params.id}`)
    }
  })
  .post('/delete/:id', async (req, res) => {
    try {
      if (req.session.user.username === decodeURIComponent((await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))).author)) {
        const postDeleted = await models.Post.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        req.session.message = "Post Borrado exitosamente"
      } else {
        req.sesssion.message = "Solo el autor del post puede eliminar el post"
      }
    } catch (error) {
      req.session.message = "Ha ocurrido un error, el post no ha sido borrado"
    }
    res.redirect(`/profile/${req.session.user.username}`)
  })