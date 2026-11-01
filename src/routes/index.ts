import { Router } from "express";
import healthRoutes from "./health.routes";
import usuarioRoutes from "./usuario.routes";

const routes = Router()

routes.use("/health", healthRoutes)
routes.use("/usuarios", usuarioRoutes)

export default routes