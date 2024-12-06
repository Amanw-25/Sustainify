import { Router } from 'express';
import { chatWithMistralAI } from '../controllers/index.js';
import getnewToken from '../middlewares/getnewToken.js';
import passport from 'passport';

const router = Router();

router.post(
  '/chat',
  getnewToken,
  passport.authenticate('jwt', { session: false }),
  chatWithMistralAI
);

export default router;
