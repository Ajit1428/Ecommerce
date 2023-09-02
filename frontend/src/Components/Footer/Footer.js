import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLocationDot, FaPhone } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import facebook from "../../Images/facebook.png";
import instagram from "../../Images/instagram.png";
import twitter from "../../Images/twitter.png";
import github from "../../Images/github.png";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="main__footer">
                <div className="div__style">
                    <h3 className="hover margin">About</h3>
                    <p>
                        We are pleased to be one of the online shopping service
                        provider. We appreciate your time and feedbacks
                    </p>
                </div>
                <div className="div__style">
                    <h3 className="hover margin">Quick Links</h3>
                    <ul className="ul__style">
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="div__style">
                    <h3 className="hover margin">Supports</h3>
                    <ul className="ul__style">
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/">Merchant Support</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/products">Help Center</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/about">Hire an Expert</Link>
                        </li>
                        <li>
                            <FaArrowRight className="arrow" />
                            <Link to="/contact">Community</Link>
                        </li>
                    </ul>
                </div>
                <div className="div__style">
                    <h3 className="hover margin">Find Us</h3>
                    <ul className="ul__style">
                        <li>
                            <FaLocationDot className="find__icons" />
                            <Link to="/">Kathmandu,Nepal</Link>
                        </li>
                        <li>
                            <FaPhone className="find__icons" />
                            <Link to="/products">+977 9812345678</Link>
                        </li>
                        <li>
                            <SiGmail className="find__icons" />
                            <Link to="/about">info@ecommerce.com.np</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="div__style__social">
                <ul className="ul__style__social">
                    <li>
                        <Link to="https://www.facebook.com">
                            <img
                                src={facebook}
                                alt="facebook"
                                className="social__logo"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.instagram.com">
                            <img
                                src={instagram}
                                alt="instagram"
                                className="social__logo"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.twitter.com">
                            <img
                                src={twitter}
                                alt="twitter"
                                className="social__logo"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.github.com/Ajit1428/Project">
                            <img
                                src={github}
                                alt="github"
                                className="social__logo"
                            />
                        </Link>
                    </li>
                </ul>
                <p className="end__p">
                    Copyright &copy;{new Date().getFullYear()} All rights
                    reserved.
                </p>
            </div>
        </>
    );
};

export default Footer;
