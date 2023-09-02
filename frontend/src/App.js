import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeNext from "./Components/Home/HomeNext";
import AboutUs from "./Components/About Us/AboutUs";
import ContactUs from "./Components/Contact Us/ContactUs";
import ProductDetails from "./Components/Products/Products Component/ProductDetails";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Store";
import Search from "./Components/Products/Search/Search";
import LoginSignUp from "./Components/Users/LoginSignUp";
import Profile from "../src/Components/Users/UsersProfile/Profile";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import UpdateProfile from "./Components/Users/UsersProfile/UpdateProfile";
import UpdatePassword from "./Components/Users/UsersProfile/UpdatePassword";
import ForgetPassword from "./Components/Users/UsersProfile/ForgetPassword";
import ResetPassword from "./Components/Users/UsersProfile/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import OrderList from "./Components/Admin/OrderList";
import UsersList from "./Components/Admin/UsersList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
import { ScrollToTop } from "./Components/Scroller/ScrollToTop";
import { loadUser } from "./Actions/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const App = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");
    const dispatch = useDispatch();
    // const uri = "https://project-ecommerce-backend.onrender.com"

    const getStripeApiKey = async () => {
        const { data } = await axios.get(`/api/v1/payment/stripeapikey`);
        setStripeApiKey(data.stripeApiKey);
    };

    useEffect(() => {
        store.dispatch(loadUser());
        getStripeApiKey();
    }, []);

    // window.addEventListener("contextmenu", (e) => e.preventDefault());

    return (
        <>
            <Provider store={store}>
                <Router>
                    <ScrollToTop />
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<HomeNext />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                        <Route exact path="/products" element={<Products />} />
                        <Route exact path="/about" element={<AboutUs />} />
                        <Route exact path="/contact" element={<ContactUs />} />
                        <Route
                            path="/products/:keyword"
                            element={<Products />}
                        />
                        <Route exact path="/search" element={<Search />} />
                        <Route
                            exact
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path={"/register"}
                            element={<LoginSignUp />}
                        />
                        <Route
                            exact
                            path={"/login"}
                            element={<LoginSignUp />}
                        />
                        <Route
                            exact
                            path={"/register"}
                            element={<LoginSignUp />}
                        />
                        <Route
                            exact
                            path="/me/update"
                            element={
                                <ProtectedRoute>
                                    <UpdateProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/password/update"
                            element={
                                <ProtectedRoute>
                                    <UpdatePassword />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/password/forget"
                            element={<ForgetPassword />}
                        />
                        <Route
                            exact
                            path="/password/reset/:token"
                            element={<ResetPassword />}
                        />
                        <Route exact path="/cart" element={<Cart />} />
                        <Route
                            exact
                            path="/shipping"
                            element={
                                <ProtectedRoute>
                                    <Shipping />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/order/confirm"
                            element={
                                <ProtectedRoute>
                                    <ConfirmOrder />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/process/payment"
                            element={
                                stripeApiKey && (
                                    <Elements stripe={loadStripe(stripeApiKey)}>
                                        <ProtectedRoute>
                                            <Payment />
                                        </ProtectedRoute>
                                    </Elements>
                                )
                            }
                        />
                        <Route
                            exact
                            path="/success"
                            element={
                                <ProtectedRoute>
                                    <OrderSuccess />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <MyOrders />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/order/:id"
                            element={
                                <ProtectedRoute>
                                    <OrderDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/products"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <ProductList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/product"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <NewProduct />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/product/:id"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <UpdateProduct />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/orders"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <OrderList />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/admin/order/:id"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <ProcessOrder />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/admin/users"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <UsersList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/user/:id"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <UpdateUser />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/reviews"
                            element={
                                <ProtectedRoute isAdmin={true}>
                                    <ProductReviews />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </Router>
            </Provider>
        </>
    );
};

export default App;
