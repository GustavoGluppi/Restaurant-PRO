import { Router } from "express";
import { queryTable } from "../controllers/chartController.js";

const router = Router();

router.route("/api/chart").post(queryTable);

export default router;
