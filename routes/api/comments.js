import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";
import { myDate, myDecodingURI, toMoment } from "../../utils/validation.js";

export default Router()
  .get('/:id/comments', async (req, res) => {
    const commentaries = myDecodingURI(await models.Commentary.find({ post_id: req.params.id }).sort({ date_created: -1 }))
    commentaries.map(x => {
      x.date_created = myDate(x.date_created)
    })
    res.status(200).json(commentaries)
  })
  .post('/:id/comments', async (req, res) => {
    const date = new Date()
    let comment = {
      post_id: req.params.id,
      author: encodeURIComponent(req.session.user.username),
      content: encodeURIComponent(req.body.content),
      date_created: toMoment(date)
    }
    await (new models.Commentary(comment)).save()
    req.session.message = "Comentario publicado exitosamente"
    res.status(200).redirect(`/post/${comment.post_id}`)
  })
  .post('/:id/comments/:commentId', async (req, res) => {
    try {
      await models.Commentary.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.commentId) })
      req.session.message = "Comentario Borrado exitosamente"
    } catch (error) {
      req.session.message = "Ha ocurrido un error, el comentario no ha sido borrado"
    }
    res.redirect(`/post/${req.params.id}`)
  })