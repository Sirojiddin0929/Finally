import { Router } from "express";
import { match_fixture } from "../controller/index.js";
const router = Router()

router.get("/", match_fixture.get)
router.post("/", match_fixture.post)
router.put("/:id", match_fixture.put)
router.delete("/:id", match_fixture.delete)

export {router as matchFixtureRouter}