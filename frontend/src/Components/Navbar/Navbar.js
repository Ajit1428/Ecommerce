import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserOptions from "../Users/UsersProfile/UserOptions";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

import {
    FaShopware,
    FaMagnifyingGlass,
    FaCartShopping,
    FaUser,
    FaBars,
    FaXmark,
} from "react-icons/fa6";
import "./Navbar.css";

const Navbar = () => {
    const { data, isAuthenticated, loading } = useSelector(
        (state) => state.user
    );
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <nav className="nav__bar">
                        <div className="nav__div">
                            <div className="nav__logo">
                                <Link to="/">
                                    ECOM <FaShopware className="logo__ecom" />
                                </Link>
                            </div>
                            <div
                                className="nav_hamburger"
                                onClick={handleClick}
                            >
                                {click ? <FaXmark /> : <FaBars />}
                            </div>
                            <ul
                                className={
                                    click ? "nav__mid active" : "nav__mid"
                                }
                                onClick={handleClick}
                            >
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/products">Products</Link>
                                </li>

                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact Us</Link>
                                </li>
                            </ul>
                            <ul
                                className={
                                    click ? "nav__end active" : "nav__end"
                                }
                                onClick={handleClick}
                            >
                                <li>
                                    <Link to="/search">
                                        <FaMagnifyingGlass />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cart">
                                        <FaCartShopping />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/account">
                                        <FaUser />
                                    </Link>
                                </li>
                            </ul>
                            <div className="userOption">
                                {isAuthenticated && <UserOptions data={data} loading={loading} />}
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Navbar;
