import { Rating } from "@mui/material";
import "./ProductsCard.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const Products = ({ product, loading }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Link className="productCart" to={`/product/${product._id}`}>
                        <img src={product.images[0].url} alt={product.name} />
                        <p>{product.name}</p>
                        <div className="ratings">
                            <Rating {...options} />{" "}
                            <span className="ratings_span">({product.numOfReviews} reviews)</span>
                        </div>
                        <span>{`$${product.price}`}</span>
                    </Link>
                </>
            )}
        </>
    );
};

export default Products;
