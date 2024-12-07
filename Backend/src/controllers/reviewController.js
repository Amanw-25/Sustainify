import Review from "../models/reviewmodel.js";
import ProductModel from "../models/productmodel.js";

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;

  const validRatings = reviews.filter((review) => review.rating >= 1 && review.rating <= 5);
  if (validRatings.length === 0) return 0;

  const totalRating = validRatings.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / validRatings.length;
  return Math.max(averageRating, 0);
};

const addReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const { user } = req;

  if (!rating || !comment) {
    return res.status(400).json({
      status: "Failed",
      message: "Rating and comment are required.",
    });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    const review = new Review({
      product: productId,
      user: user._id,
      rating,
      comment,
    });

    await review.save();

    product.reviews.push(review);
    await product.save();

    const averageRating = calculateAverageRating(product.reviews);
    product.averageRating = averageRating;

    await product.save();

    res.status(201).json({
      status: "Success",
      message: "Review added successfully",
      review,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error adding review",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params; // Get reviewId from URL params
  const { user } = req;  // Assuming user is authenticated

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        status: "Failed",
        message: "Review not found",
      });
    }

    // Check if the current user is the one who wrote the review
    if (review.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        status: "Failed",
        message: "You can only delete your own reviews",
      });
    }

    // Find the product associated with the review
    const product = await ProductModel.findById(review.product);
    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    // Remove the review from the product's reviews array
    product.reviews = product.reviews.filter(
      (reviewId) => reviewId.toString() !== review._id.toString()
    );
    await product.save();

    // Delete the review itself
    await review.deleteOne();

    // Recalculate the average rating of the product
    const averageRating = calculateAverageRating(product.reviews);
    product.averageRating = averageRating;

    // Save the product with the updated average rating
    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// Update review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;  // Get reviewId from URL params
  const { rating, comment } = req.body;  // Get updated rating and comment from request body
  const { user } = req;  // Assuming user is authenticated

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        status: "Failed",
        message: "Review not found",
      });
    }

    // Check if the current user is the one who wrote the review
    if (review.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        status: "Failed",
        message: "You can only update your own reviews",
      });
    }

    // Update the review
    review.rating = rating || review.rating;  // Keep the current rating if not provided
    review.comment = comment || review.comment;  // Keep the current comment if not provided

    // Save the updated review
    await review.save();

    // Find the product associated with the review
    const product = await ProductModel.findById(review.product);
    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    // Recalculate the average rating of the product
    const averageRating = calculateAverageRating(product.reviews);
    product.averageRating = averageRating;

    // Save the product with the updated average rating
    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Error updating review",
      error: error.message,
    });
  }
};


const getAllReview=async(req,res)=>{
  try{
    const reviews=await Review.find();
    if(reviews===0){
      res.status(500).json({
        status:"Failed",
        message:"Review is Empty"
      })
    }

    res.status(200).json({
      status:"Success",
      message:"Retrival Successfull",
      reviews
    })


  }

  catch(error){
    res.status(500).json({
      status:"Failed",
      message:"Get All Review Failed"
    })
  }
}

export { addReview ,deleteReview ,updateReview,getAllReview};