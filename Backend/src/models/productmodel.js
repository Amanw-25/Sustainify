import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  images: [
    {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],
  averageRating: { type: Number, default: 0 },
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
