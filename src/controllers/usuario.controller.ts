import type { Request, Response } from "express";
import usuarioService from "../services/usuario.service";
import { AppError } from "../utils/AppError";

class UsuarioController {
    async cadastrar(req: Request, res: Response): Promise<void> {
        //"?? {}" evita erro caso a requisição cenha sem corpo(req.body undefined)
        const { nome, email, senha } = req.body ?? {}

        const usuario = await usuarioService.cadastrar({ nome, email, senha })

        res.status(201).json(usuario)
    }
    async me(req: Request, res: Response): Promise<void> {
        // req.usuario é preenchido pelo middleware auth; conferimos para o TypeScript e por segurança
        if (!req.usuario) {
            throw new AppError("Não autenticado.", 401)
        }
        const usuario = await usuarioService.buscarPorId(req.usuario.id)
        res.status(200).json(usuario)
    }
}

export default new UsuarioController()