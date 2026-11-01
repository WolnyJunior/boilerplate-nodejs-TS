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
        // 409 Conflict: o recurso já existe.
        // (A coluna "unique" do banco é uma segunda proteção caso duas requisições cheguem juntas.)
        const emailExistente = await Usuario.findOne({ where: { email } })
        if (emailExistente) {
            throw new AppError("E-mail já cadastrado.", 409)
        }

        // hash: transforma a senha num texto irreversível. O 10 é o "custo":
        // quanto maior, mais lento (e mais difícil de quebrar por força bruta).
        const senhaHash = await bcrypt.hash(senha, 10)

        // O perfil NÃO vem do cliente: todo cadastro público nasce como "usuario" (padrão do model).
        // Se aceitar "perfil" no body, qualquer um se cadastraria como admin.
        const usuario = await Usuario.create({
            nome,
            email,
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
    async listar(): Promise<UsuarioPublico[]> {
        const usuarios = await Usuario.findAll({ order: [["id", "ASC"]] })
        return usuarios.map(toUsuarioPublico)
    }
    async deletar(id: number, usuarioAtual: number): Promise<void> {
        if (id === usuarioAtual) {
            throw new AppError("Não é possivel apagar a propria conta.", 400)
        }

        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            throw new AppError("Usuário não encontrado.", 404)
        }

        await usuario.destroy()
    }
}

export default new UsuarioService()