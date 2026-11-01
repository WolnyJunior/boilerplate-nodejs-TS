import type { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const { email, senha } = req.body ?? {}

        const resultado = await authService.login({ email, senha })

        res.status(200).json(resultado)
    }
}

export default new AuthController()