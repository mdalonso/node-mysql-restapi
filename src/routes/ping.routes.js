import { Router } from "express";
import { getPing } from "../controllers/ping.controller.js"


const router=Router();

router.get('/ping',getPing);

export default router;
