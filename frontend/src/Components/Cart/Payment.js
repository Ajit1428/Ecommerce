import React, { useEffect, useRef } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../MetaData/Metadata";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import { MdCreditCard,  MdEvent, MdVpnKey } from "react-icons/md";
import { createOrder, clearErrors } from "../../Actions/orderAction";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { data, loading } = useSelector((state) => state.user);
    const {error} = useSelector((state)=> state.newOrder)

    const user = data

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault(); 
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );
            const clientSecret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });
            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order))
                    navigate("/success");
                } else {
                    alert.error(
                        "There's some issue while processing the payment"
                    );
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.msg);
        }
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

    return (
        <>
            <Metadata title="Payment" />
            <CheckOutSteps activeStep={2} />
            <div className="paymentContainer">
                <form
                    className="paymentForm"
                    onSubmit={(e) => submitHandler(e)}
                >
                    <Typography>Card Info</Typography>
                    <div>
                        <MdCreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <MdEvent />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    );
};

export default Payment;
