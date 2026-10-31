import "dotenv/config"

export const env = {
    // process.env sempre devolve string; Number() converte a porta para número.
    // O "?? 3000" é o valor padrão caso PORT não esteja definida.
    port: Number(process.env.PORT ?? 3000)
}