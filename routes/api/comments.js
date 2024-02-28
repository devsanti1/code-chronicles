import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";
import { myDate, toMoment } from "../../utils/validation.js";

export default Router()
  .get('/:id/comments', async (req, res) => {
    res.status(200).json((JSON.parse(JSON.stringify(await models.Commentary.find({ post_id: req.params.id })))).sort((a, b) => toMoment(b.date_created) - toMoment(a.date_created)))
  })
  .post('/:id/comments', async (req, res) => {
    const date = new Date()
    let comment = {
      post_id: req.params.id,
      author: encodeURIComponent(req.session.user.username),
      content: encodeURIComponent(req.body.content),
      date_created: myDate(date.getDate(), date.getMonth(), date.getFullYear())
    }
    await (new models.Commentary(comment)).save()
    req.session.message = "Comentario publicado exitosamente"
    res.status(200).redirect(`/post/${comment.post_id}`)
  })
  .delete('/:id/comments/:commentId', async (req, res) => {
    try {
      await models.Commentary.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.commentId) })
      req.session.message = "Comentario Borrado exitosamente"
    } catch (error) {
      console.log(error);
      req.session.message = "Ha ocurrido un error, el comentario no ha sido borrado"
    }
    console.log(req.session.message);
    res.redirect(`/post/${req.params.id}`)
  })