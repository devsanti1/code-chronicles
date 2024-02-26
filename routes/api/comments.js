import { Router } from "express";
import { models } from "../../utils/mongoose.js";
import mongoose from "mongoose";

export default Router()
  .get('/:id/comments', async (req, res) => {
    res.status(200).send(await models.Commentary.find({ post_id: req.params.id }))
  })
  .post('/:id/comments', async (req, res) => {
    let comment = {
      post_id: req.params.id,
      author: encodeURIComponent(req.session.user.username),
      content: encodeURIComponent(req.body.content),
      date_created: (new Date()).toJSON()
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