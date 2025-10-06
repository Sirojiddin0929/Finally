import { Router } from "express";
import { tournaments } from "../controller/index.js";
const router = Router()

router.get("/", tournaments.get)
router.post("/", tournaments.post)
router.put("/:id", tournaments.put)
router.delete("/:id", tournaments.delete)

export {router as tournamentsRouter}