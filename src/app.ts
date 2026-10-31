import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())//permite ler o corpo das requisições em JSON
app.use(routes)

export default app