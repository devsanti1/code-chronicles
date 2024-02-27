import { Router } from "express";
import dotenv from "dotenv"

dotenv.config()

const layout = "layouts/public.ejs"
export default Router()
  .get('/', async (req, res) => {
    const posts = await (await fetch(`${process.env.URL}/api/posts`, { method: 'get' })).json()
    res.render(layout, { title: "CodeChronicles - Home", view: "home", data: { posts: posts, session: req.session } })
  })
  .get('/register', (req, res) => {
    console.log(req.session.message);
    res.render(layout, { title: "CodeChronicles - Registro", view: "register", data: { session: req.session } })
  })
  .get('/login', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Iniciar Sesión", view: "login", data: { session: req.session } })
  })
  .get('/profile/:username', async (req, res) => {
    const author = await (await fetch(`${process.env.URL}/api/posts/author/${req.params.username}/info`, { method: 'get' })).json()
    const posts = await (await fetch(`${process.env.URL}/api/posts/author/${req.params.username}`, { method: 'get' })).json()
    res.render(layout, { title: `CodeChronicles - @${req.params.username}`, view: "profile", data: { posts: posts, author: author, session: req.session } })
  })
  .get('/post/:id', async (req, res) => {
    const post = await (await fetch(`${process.env.URL}/api/posts/${req.params.id}`, { method: 'get' })).json()
    const author = await (await fetch(`${process.env.URL}/api/posts/author/${post.author}/info`, { method: 'get' })).json()
    const comments = await (await fetch(`${process.env.URL}/api/posts/${req.params.id}/comments`, { method: 'get' })).json()
    res.render(layout, { title: `CodeChronicles - ${req.params.id}`, view: "post", data: { post: post, author: author, comments: comments, session: req.session } })
  })
  .get('/create', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Crear Post", view: "create", data: { session: req.session } })
  })
  .get('/edit/:id', (req, res) => {
    res.render(layout, { title: `CodeChronicles - Editar ${req.params.id}`, view: "edit", data: { session: req.session } })
  })