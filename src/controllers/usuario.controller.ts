import type { Request, Response } from "express";
import usuarioService from "../services/usuario.service";

class UsuarioController {
    async cadastrar(req: Request, res: Response): Promise<void> {
        //"?? {}" evita erro caso a requisição cenha sem corpo(req.body undefined)
        const { nome, email, senha } = req.body ?? {}

        const usuario = await usuarioService.cadastrar({ nome, email, senha })

        res.status(201).json(usuario)
    }
}

export default new UsuarioController()