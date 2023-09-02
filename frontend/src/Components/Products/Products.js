import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productAction";
import { TbShoppingCartOff } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import ProductsCard from "./Products Component/ProductsCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import "./Products.css";
import Metadata from "../MetaData/Metadata";

const categories = [
    "Smart Phones",
    "Laptops",
    "Mobile devices",
    "Gaming PC",
    "Accessories",
];
const Products = () => {
    const alert = useAlert();
    const { keyword } = useParams();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 500000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductCount,
    } = useSelector((state) => state.products);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const count = filteredProductCount;
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }            
        dispatch(getProduct(keyword, currentPage, price, category, ratings));

    }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                <Metadata title={"PRODUCTS -- ECOMMERCE"}/>
                    <h2 className="productHeadings">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductsCard
                                    key={product._id}
                                    product={product}
                                    loading={loading}
                                />
                            ))}
                    </div>
                    {filteredProductCount ? (
                        <div className="filterBox">
                            <Typography className="first__typo">
                                Price
                            </Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={500000}
                                size="small"
                            />
                            <Typography className="second__typo">
                                Categories
                            </Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() =>  setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                value={ratings}
                                onChange={(e,newRatings) => {
                                    setRatings(newRatings)
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                                sx={{width: 100}}
                                size="small"
                                />
                            </fieldset>
                        </div>
                    ) : (
                        <div className="noProducts">
                            <TbShoppingCartOff className="noShopping" />
                            <h2>Product Unavailable</h2>
                            <a href="/products">
                                <button className="redirect">
                                    Continue Shopping
                                </button>
                            </a>
                        </div>
                    )}

                    {resultPerPage < count && (
                        <div className="paginationDiv">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="<<"
                                lastPageText=">>"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Products;
