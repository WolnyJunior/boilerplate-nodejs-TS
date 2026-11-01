import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";
import auth from "../middleware/auth";

const usuarioRoutes = Router()

usuarioRoutes.post("/", (req, res) => UsuarioController.cadastrar(req, res))
usuarioRoutes.get("/me", auth, (req, res) => UsuarioController.me(req, res))

export default usuarioRoutes