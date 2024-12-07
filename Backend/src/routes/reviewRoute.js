import express from 'express';
import { addReview, deleteReview, getAllReview, updateReview } from '../controllers/reviewController.js';
import getnewToken from '../middlewares/getnewToken.js';
import passport from 'passport';

const router = express.Router();

router.post(
  "/:productId/review", 
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  addReview
);

router.delete(
  "/review/:reviewId", 
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  deleteReview
);

router.post(
  "/review/:reviewId", 
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  updateReview
);

router.get(
  "/", 
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getAllReview
);

export default router;


