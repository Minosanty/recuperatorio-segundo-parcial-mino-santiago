 import express from "express";
import { actulizarlanguage, crearlanguage , eliminacion, obtenerPorId, obtenerTodosLoslenguage } from "../controllers/language.controllers.js";
const router = express.Router();

router.get("/Language", obtenerTodosLoslenguage);
router.get("/Language/:id", obtenerPorId);
router.post("/Language", crearlanguage );
router.put("/Language/:id", actulizarlanguage);
router.delete("/Language/:id", eliminacion);

export default router;