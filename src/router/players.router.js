import { Router } from "express";
import { players } from "../controller/index.js";
const router = Router()

router.get("/", players.get)
router.post("/", players.post)
router.put("/:id", players.put)
router.delete("/:id", players.delete)

export {router as playersRouter}