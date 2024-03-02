import { Router } from "express";
import dotenv from "dotenv"

dotenv.config()

const layout = "layouts/layout.ejs"
export default Router()
  .get('/', async (req, res) => {
    const config = {
      page: req.query.page ? req.query.page : 0,
      search: req.query.search ? `&search=${decodeURIComponent(req.query.search)}` : "",
    }
    const posts = (await (await fetch(`${process.env.URL}/api/posts?page=${config.page}${config.search}`, { method: 'get' })).json())
    res.render(layout, { title: "CodeChronicles - Home", view: "home", data: { posts: posts.posts, session: req.session, config: posts.config } })
  })
  .get('/register', (req, res) => {
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
    const comments = (await (await fetch(`${process.env.URL}/api/posts/${req.params.id}/comments`, { method: 'get' })).json())
    res.render(layout, { title: `CodeChronicles - ${req.params.id}`, view: "post", data: { post: post, comments: comments, session: req.session } })
  })
  .get('/create', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Crear Post", view: "create", data: { session: req.session } })
  })
  .get('/edit/:id', async (req, res) => {
    const post = await (await fetch(`${process.env.URL}/api/posts/${req.params.id}`, { method: 'get' })).json()
    res.render(layout, { title: `CodeChronicles - Editar ${req.params.id}`, view: "edit", data: { session: req.session, post: post } })
  })
  .post('/msg', (req, res) => {
    req.session.message = undefined
    res.send("")
  })