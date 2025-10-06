import { Router } from "express";
import { football_clubs } from "../controller/index.js";
const router = Router()

router.get("/", football_clubs.get)
router.post("/", football_clubs.post)
router.put("/:id", football_clubs.put)
router.delete("/:id", football_clubs.delete)

export {router as footballClubsRouter}