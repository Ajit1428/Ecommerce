import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import "./HomeNext.css";
import Metadata from "../MetaData/Metadata.js";
import { clearErrors, getProduct } from "../../Actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Products from "../Products/Products Component/ProductsCard";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const HomeNext = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title="ECOMMERCE" />
                    <div className="home">
                        <div className="home__div">
                            <h1>Welcome to the</h1>
                            <div className="home__animate">
                                <h3>Ecommerce Website</h3>
                            </div>
                            <div className="home__button">
                                <Link to="/login" className="btn">
                                    login
                                </Link>
                                <Link to="/register" className="btn">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="home__end">
                            <Link to="https://facebook.com">
                                <FaFacebookF className="social__logoo" />
                            </Link>
                            <Link to="https://instagram.com">
                                <FaInstagram className="social__logoo" />
                            </Link>
                            <Link to="https://github.com/Ajit1428/Project">
                                <FaGithub className="social__logoo" />
                            </Link>
                        </div>
                    </div>
                    <div className="second__div">
                        <h2 className="featured__h2">Featured Products</h2>
                        <div className="featured">
                            {products &&
                                products.map((product) => (
                                    <Products product={product} key={product._id} />
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default HomeNext;
