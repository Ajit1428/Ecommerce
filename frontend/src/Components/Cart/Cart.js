import React from "react";
import CartItemsCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData/Metadata";
import Loader from "../Loader/Loader";

import {
    addItemsToCart,
    removeItemsFromCart,
} from "../../Actions/cartAction.js";
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkOutHandler = () => {
        navigate("/login?redirect=/shipping");
    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Cart" />
                    {cartItems.length === 0 ? (
                        <div className="emptyCart">
                            <MdRemoveShoppingCart />
                            <Typography>No Product In Your Cart</Typography>
                            <Link to="/products">View Products</Link>
                        </div>
                    ) : (
                        <>
                            <div className="cartPage">
                                <div className="cartHeader">
                                    <p>Product</p>
                                    <p>Quality</p>
                                    <p>SubTotal</p>
                                </div>
                                {cartItems &&
                                    cartItems.map((item) => (
                                        <div
                                            className="cartContainer"
                                            key={item.product}
                                        >
                                            <CartItemsCard
                                                item={item}
                                                deleteCartItems={
                                                    deleteCartItems
                                                }
                                            />

                                            <div className="cartInput">
                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.product,
                                                            item.quantity
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.product,
                                                            item.quantity,
                                                            item.stock
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="cartSubtotal">{`$${
                                                item.price * item.quantity
                                            }`}</p>
                                        </div>
                                    ))}
                                <div className="cartGrossProfit">
                                    <div></div>
                                    <div className="cartGrossProfitBox">
                                        <p>Gross Profit</p>
                                        <p>{`$${cartItems.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.quantity * item.price,
                                            0
                                        )}`}</p>
                                    </div>
                                    <div></div>
                                    <div className="checkOutBtn">
                                        <button onClick={checkOutHandler}>
                                            Check Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Cart;
