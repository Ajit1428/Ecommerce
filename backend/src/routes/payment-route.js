import express from "express";
import { tokenAuth } from "../middlewares/accessToken-middleware.js";
import paymentCon from "../controllers/payment-controller.js";

const router = express.Router()

router
    .post("/process", tokenAuth, paymentCon.processPayment)
    .get("/stripeapikey", tokenAuth, paymentCon.sendStripeApiKey)



export {router as paymentRoute}