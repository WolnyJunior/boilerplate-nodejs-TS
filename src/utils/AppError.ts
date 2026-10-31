// Erro esperado da aplicação: mensagem + status HTTP
// "extends Error" herda o comportamento do erro nativo do JS(stack trace, message)

export class AppError extends Error {
    public readonly statusCode: number

    constructor(message: string, statusCode = 400) {
        super(message)          // chama o construtor do Error com a mensagem
        this.name = "AppError"
        this.statusCode = statusCode
    }
}