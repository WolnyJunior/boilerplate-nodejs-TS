import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const usuarioRoutes = Router()

usuarioRoutes.post("/", (req, res) => UsuarioController.cadastrar(req, res))

export default usuarioRoutes