import { Router } from "express";
import { getCols, getTables } from "../controllers/tablesController.js";

const router = Router();

router.route("/api/tables").get(getTables);
router.route("/api/tables/:table").get(getCols);

export default router;
