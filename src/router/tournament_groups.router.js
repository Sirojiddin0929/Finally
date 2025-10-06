import { Router } from "express";
import { tournament_groups } from "../controller/index.js";
const router = Router()

router.get("/", tournament_groups.get)
router.post("/", tournament_groups.post)
router.put("/:id", tournament_groups.put)
router.delete("/:id", tournament_groups.delete)

export {router as tournamentGroupsRouter}