import { Router, json } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";
import { myDate, myDecodingURI, toMoment } from "../../utils/validation.js";

export default Router()
  .get('/', async (req, res) => {
    const config = {
      page: req.query.page ? parseInt(req.query.page) : 0,
      search: req.query.search,
      len: (await (models.Post.find(req.query.search ? { $text: { $search: req.query.search } } : {}))).length
    }
    let posts = myDecodingURI(await (models.Post.find(config.search ? { $text: { $search: config.search } } : {}, {}, { limit: 20, skip: config.page * 20 })).sort({ date_updated: -1 }))
    posts.map(x => {
      x.date_created = myDate(x.date_created)
      x.date_updated = myDate(x.date_updated)
    })
    res.status(200).json({ posts: posts, config: config })
  })
  .get('/:id', async (req, res) => {
    try {
      let post = myDecodingURI(await models.Post.findById(new mongoose.Types.ObjectId(req.params.id)))
      post.date_created = myDate(post.date_created)
      post.date_updated = myDate(post.date_updated)
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({})
    }
  })
  .get('/author/:username', async (req, res) => {
    try {
      const posts = myDecodingURI(await (models.Post.find({ author: encodeURIComponent(req.params.username) }).sort({ date_updated: -1 })))
      posts.map(x => {
        x.date_created = myDate(x.date_created)
        x.date_updated = myDate(x.date_updated)
      })
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({})
    }
  })
  .get('/author/:username/info', async (req, res) => {
    const author = myDecodingURI(await models.User.findOne({ username: encodeURIComponent(req.params.username) }, "username email date_created"))
    author.date_created = myDate(author.date_created)
    res.status(200).json(author)
  })

  .post('/', async (req, res) => {
    const date = new Date()
    let post = {
      _id: new mongoose.Types.ObjectId(),
      title: encodeURIComponent(req.body.title.trim()),
      content: encodeURIComponent(req.body.content.trim()),
      author: encodeURIComponent(req.session.user.username),
      date_created: toMoment(date),
      date_updated: toMoment(date)
    }
    await (new models.Post(post)).save()
    res.status(200).redirect(`/post/${post._id}`)
  })
  .post('/put/:id', async (req, res) => {
    const date = new Date()
    try {
      let doc = await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))
      doc.title = encodeURIComponent(req.body.title.trim())
      doc.content = encodeURIComponent(req.body.content.trim())
      doc.date_updated = toMoment(date)
      await doc.save()
      res.redirect(`/post/${doc._id}`)
    } catch (error) {
      res.redirect(`/post/${req.params.id}`)
    }
  })
  .post('/delete/:id', async (req, res) => {
    try {
      if (req.session.user.username === decodeURIComponent((await models.Post.findById(new mongoose.Types.ObjectId(req.params.id))).author)) {
        await models.Post.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        await models.Commentary.deleteMany({ post_id: req.params.id })
        req.session.message = { color: "success", msg: "Post Borrado exitosamente" }
      } else {
        req.session.message = { color: "warning", msg: "Solo el autor del post puede eliminar el post" }
      }
    } catch (error) {
      req.session.message = { color: "danger", msg: "Ha ocurrido un error, el post no ha sido borrado" }
    }
    res.redirect(`/profile/${req.session.user.username}`)
  })