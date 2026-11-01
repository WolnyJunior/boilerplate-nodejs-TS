import bcrypt from "bcryptjs"
import { Usuario } from "../models/Usuario"
import { AppError } from "../utils/AppError"
import { error } from "node:console"

// DTO(Data Transfer Object): descreve os dados que o service recebe

interface CadastrarUsuarioDTO {
    nome: string
    email: string
    senha: string
}

// O que devolcemos ao cliente.
export interface UsuarioPublico {
    id: number
    nome: string
    email: string
    perfil: "usuario" | "admin"
}

// Converte o model em um objeto seguro para devolver ao cliente( sem senhaHash )
export function toUsuarioPublico(usuario: Usuario): UsuarioPublico {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    }
}

class UsuarioService {
    async cadastrar({ nome, email, senha }: CadastrarUsuarioDTO): Promise<UsuarioPublico> {
        // Os dados vêm do corpo da requisição, então checa o tipo em tempo de execução
        if (typeof nome !== "string") {
            throw new AppError("Nome é obrigatório", 400)
        }
        if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            throw new AppError("E-mail inválido.", 400)
        }
        if (typeof senha !== "string" || senha.length < 8) {
            throw new AppError("A senha deve ter pelo menos 8 caracteres", 400)
        }

        const emailPadronizado = email.trim().toLowerCase()

        const emailExistente = await Usuario.findOne({ where: { email: emailPadronizado } })
        if (emailExistente) {
            throw new AppError("E-mail já cadastrado.", 409)
        }

        // hash: transforma a senha num texto irreversível. O 10 é o "custo":
        // quanto maior, mais lento (e mais difícil de quebrar por força bruta).
        const senhaHash = await bcrypt.hash(senha, 10)

        // O perfil NÃO vem do cliente: todo cadastro público nasce como "usuario" (padrão do model).
        // Se aceitar "perfil" no body, qualquer um se cadastraria como admin.
        const usuario = await Usuario.create({
            nome: nome.trim(),
            email: emailPadronizado,
            senhaHash
        })

        return toUsuarioPublico(usuario)
    }
    async buscarPorId(id: number): Promise<UsuarioPublico> {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            throw new AppError("Usuário não encontrado", 404)
        }
        return toUsuarioPublico(usuario)
    }
}

export default new UsuarioService()