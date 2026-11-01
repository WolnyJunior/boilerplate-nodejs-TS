import { AppError, type DetalheErro } from "../utils/AppError";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numeroMaximoCaracteresNome = "O nome deve conter no máximo 100 caracteres."
const numeroMaximoCaracteresEmail = "O email deve conter no máximo 150 caracteres."

export interface DadosCadastro {
    nome: string
    email: string
    senha: string
}

//"dados" vem direto do corpo da requisição: pode ter qualquer formato, por isso é "unknown"
export function validarCadastro(dados: Record<string, unknown>): DadosCadastro {
    const erros: DetalheErro[] = []
    // Se o campo não for texto, vira "" e cai no "obrigatório". Também já limpamos os dados.
    const nome = typeof dados.nome === "string" ? dados.nome.trim() : ""
    const email = typeof dados.email === "string" ? dados.email.trim().toLowerCase() : ""
    const senha = typeof dados.senha === "string" ? dados.senha.trim() : ""

    if (!nome) {
        erros.push({ campo: "nome", mensagem: "Nome é obrigatório" })
    } else if (nome.length > 100) {
        erros.push({ campo: "nome", mensagem: numeroMaximoCaracteresNome })
    }

    if (!email) {
        erros.push({ campo: "email", mensagem: "E-mail é obrigatório." })
    } else if (!REGEX_EMAIL.test(email)) {
        erros.push({ campo: "email", mensagem: "E-mail inválido." })
    } else if (email.length > 150) {
        erros.push({ campo: "email", mensagem: numeroMaximoCaracteresEmail })
    }

    if (!senha) {
        erros.push({ campo: "senha", mensagem: "Senha é obrigatória." })
    } else if (senha.length < 8) {
        erros.push({ campo: "senha", mensagem: "A senha deve conter pelo menos 8 caracteres" })
    } else if (Buffer.byteLength(senha, "utf-8") > 72) {
        erros.push({ campo: "senha", mensagem: "A senha deve ter no máximo 72 caracteres." })
    }

    //Só lança depois de checar todos os campos: o cliente recebe uma lista completa
    if (erros.length > 0) {
        throw new AppError("Dados inválidos", 400, erros)
    }
    return { nome, email, senha }
}