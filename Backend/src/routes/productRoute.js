import express from 'express';
import {addProduct, deleteProduct, updateProduct ,getAllProducts,getProductById} from '../controllers/productController.js';
import upload from '../middlewares/upload.js';
import getnewToken from '../middlewares/getnewToken.js';
import passport from 'passport';

const router = express.Router();

router.post(
  "/add",
  upload.array('images',5),
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  addProduct
);

router.put(
  "/update/:id",
  upload.array('images',5),
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  updateProduct
);

router.delete(
  "/delete/:id",
  upload.array('images',5),
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

router.get(
  "/all",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);

router.get(
  "/product/:id",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getProductById
);


export default router;

