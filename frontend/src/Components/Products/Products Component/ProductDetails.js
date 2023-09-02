import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../../Actions/productAction";
import { NEW_REVIEW_RESET } from "../../../Constants/productConstants";
import Loader from "../../Loader/Loader";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import Metadata from "../../MetaData/Metadata";
import { addItemsToCart } from "../../../Actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
	Rating
} from "@mui/material";

const ProductDetails = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const options = {
        value: product.ratings,
        readOnly: true,
		precision: 0.5
    };
	
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Items Added To Cart");
        navigate("/cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		  }
	  
		  if (success) {
			alert.success("Review Submitted Successfully");
			dispatch({ type: NEW_REVIEW_RESET });
		  }
		
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title={`${product.name} -- ECOMMERCE`} />
                    <div className="productDetails">
                        <div className="carousel__div">
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => {
                                        return (
                                            <img
                                                className="carouselImage"
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        );
                                    })}
                            </Carousel>
                        </div>
                        <div className="details">
                            <div className="details__div1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="details__div2">
                                <Rating {...options} />
                                <span className="details_div2_span">({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="details__div3">
                                <h1>{`$${product.price}`}</h1>
                                <div className="details__div3-1">
                                    <div className="details__div3-1-1">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <input
                                            readOnly
                                            value={quantity}
                                            type="number"
                                        />
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        disabled={
                                            product.stock < 1 ? true : false
                                        }
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status :
                                    <b
                                        className={
                                            product.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.stock < 1
                                            ? "OutOfStock"
                                            : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="details__div4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className="submitReview" type="submit">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
						color="secondary"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={submitReviewToggle}
                                className="dialogBtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={reviewSubmitHandler}
                                className="dialogBtn"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard
                                        review={review}
                                        key={review._id}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetails;
