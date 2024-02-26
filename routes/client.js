import { Router } from "express";

const layout = "layouts/public.ejs"
export default Router()
  .get('/', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Home", view: "home" })
  })
  .get('/register', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Registro", view: "register" })
  })
  .get('/login', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Iniciar Sesión", view: "login" })
  })
  .get('/profile/:username', (req, res) => {
    res.render(layout, { title: `CodeChronicles - @${req.params.username}`, view: "profile" })
  })
  .get('/post/:id', (req, res) => {
    res.render(layout, { title: `CodeChronicles - ${req.params.id}`, view: "post" })
  })
  .get('/create', (req, res) => {
    res.render(layout, { title: "CodeChronicles - Crear Post", view: "create" })
  })
  .get('/edit/:id', (req, res) => {
    res.render(layout, { title: `CodeChronicles - Editar ${req.params.id}`, view: "edit" })
  })