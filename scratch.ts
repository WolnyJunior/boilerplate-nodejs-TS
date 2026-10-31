import { Usuario } from "./src/models/Usuario";
import { sequelize } from "./src/config/database";

async function run(): Promise<void> {
    const usuario = await Usuario.create({
        nome: "teste",
        email: "teste@email.com",
        senhaHash: "hash-teste"
    })
    console.log(usuario.toJSON())

    await usuario.destroy()
    await sequelize.close()
}

run()