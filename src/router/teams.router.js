import { Router } from "express";
import { teams } from "../controller/index.js";
const router = Router()

router.get("/", teams.get)
router.post("/", teams.post)
router.put("/:id", teams.put)
router.delete("/:id", teams.delete)

export {router as teamsRouter}