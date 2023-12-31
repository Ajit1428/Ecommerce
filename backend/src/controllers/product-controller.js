import productSer from "../services/product-service.js";
import cloudinary from "cloudinary";

class ProductController {
    create = async (req, res, next) => {
        try {
            /* Get id through user model */
            req.body.user = req.tokenUser._id;

            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            /*Create Product */
            let data = req.body;
            data.images = imagesLinks;
            let result = await productSer.createProduct(data);

            res.json({
                result: result,
                msg: "Product created successfully",
                status: true,
                meta: null,
            });
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to create the product: ${error.message}`,
            });
        }
    };

    getProducts = async (req, res, next) => {
        try {
            /* Fetching keyword through json query */
            let query = req.query;

            /* Get total no of documents */
            let noOfDoc = await productSer.countDocuments();

            /* Sending the results per page */
            const resultPerPage = 4;

            /* Filter, search, pagination usage to get all products */
            let result = await productSer.getAllProducts(query, resultPerPage);

            /* Fetch the current page*/
            let currenPage = Number(req.query.page) || 1;
            res.json({
                result: result[0],
                msg: "List of all the products",
                status: true,
                noOfProducts: noOfDoc,
                currentPage: currenPage,
                resultPerPage: resultPerPage,
                filteredProductCount: result[1],
            });
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to fetch the products: ${error.message}`,
            });
        }
    };

    getAdminProducts = async (req, res, next) => {
        try {
            const result = await productSer.allProductFetch();
            res.json({
                result: result,
                msg: "List of all the products",
                status: true,
            });
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to fetch the products: ${error.message}`,
            });
        }
    };

    getProductId = async (req, res, next) => {
        try {
            /* Fetch product by id */
            let result = await productSer.getProductById(req.params.id);

            res.json({
                result: result,
                msg: "The fetched product",
                status: true,
                meta: null,
            });
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to fetch the product by id: ${error.message}`,
            });
        }
    };

    update = async (req, res, next) => {
        try {
            /* Updating the product details using the id */
            let data = req.body;
            
            if(data.images){
                let images = [];

                if (typeof data.images === "string") {
                    images.push(data.images);
                } else {
                    images = data.images;
                }
    
                const imagesLinks = [];
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "products",
                    });
    
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }
    
                data.images = imagesLinks
            }

            let result = await productSer.updateProductById(
                req.params.id,
                data
            );

            res.json({
                result: result,
                msg: "Product updated successfully",
                status: true,
                meta: null,
            });
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to update the product: ${error.message}`,
            });
        }
    };

    delete = async (req, res, next) => {
        try {
            /* Delete product using the id */
            let result = await productSer.deleteProductById(req.params.id);

            for (let i = 0; i < result.images.length; i++) {
                await cloudinary.v2.uploader.destroy(
                    result.images[i].public_id
                );
            }

            if (!result) {
                next({ status: 404, msg: "Product not found" });
            } else {
                res.json({
                    result: result,
                    msg: "Deleted successfully",
                    status: true,
                    meta: null,
                });
            }
        } catch (error) {
            next({
                status: 400,
                msg: `Unable to delete the product: ${error.message}`,
            });
        }
    };

    createReview = async (req, res, next) => {
        try {
            /* Destructuring the required data */
            const { rating, comment, productId } = req.body;
            /* Storing the data in their individual key */
            const review = {
                user: req.tokenUser._id,
                name: req.tokenUser.name,
                rating: Number(rating),
                comment,
            };
            /* Fetching the product by ID */
            const product = await productSer.getProductById(productId);
            /* using the find prototype to get the exact match */
            const isReviewed = product.reviews.find(
                (rev) => rev.user.toString() === req.tokenUser._id.toString()
            );
            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user.toString() === req.tokenUser._id.toString()) {
                        (rev.rating = rating), (rev.comment = comment);
                    }
                });
            } else {
                /* Inserting the review in the array */
                product.reviews.push(review);
                product.numOfReviews = product.reviews.length;
            }
            /* Finding the average ratings */
            let avg = 0;
            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });
            product.ratings = avg / product.reviews.length;
            /* Final result */
            const final = await productSer.createReviewsandUpdate(
                productId,
                product
            );
            res.json({
                result: final,
                msg: "Reviews",
            });
        } catch (error) {
            next({
                status: 401,
                msg: "Cannot create or update the review for the product",
            });
        }
    };

    allReviews = async (req, res, next) => {
        try {
            /* Fetching the product by id */
            const product = await productSer.getProductById(req.query.id);
            if (!product) {
                next({ status: 404, msg: "Product not found" });
            }
            res.json({
                reviews: product.reviews,
                msg: "All the reviews",
                status: true,
            });
        } catch (error) {
            next({ status: 401, msg: "Cannot fetch the reviews" });
        }
    };

    deleteReviews = async (req, res, next) => {
        try {
            /* Fetching the product by id */
            const product = await productSer.getProductById(
                req.query.productId
            );
            if (!product) {
                next({ status: 404, msg: "Product not found" });
            }
            const reviewData = product.reviews.filter(
                (rev) => rev._id.toString() !== req.query.id.toString()
            );
            let avg = 0;
            reviewData.forEach((rev) => {
                avg += rev.rating;
            });
            const ratings =
                avg / reviewData.length ? avg / reviewData.length : 0;
            const numOfReviews = reviewData.length;
            await productSer.deleteReviewsById(
                req.query.productId,
                reviewData,
                ratings,
                numOfReviews
            );
            res.json({
                msg: "Review deleted successfully",
                status: true,
            });
        } catch (error) {
            next({ status: 401, msg: "Cannot delete the reviews" });
        }
    };
}

let productCon = new ProductController();
export default productCon;
