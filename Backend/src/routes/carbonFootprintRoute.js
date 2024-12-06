import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { carbonFootprintController } from "../controllers/index.js";

const router = Router();

router.post(
  "/calculate-carbon-footprint",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  carbonFootprintController
);

export default router;
