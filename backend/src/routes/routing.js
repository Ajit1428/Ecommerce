/* Main routing for all routes */
import express from "express"
import { productRoutes } from "./product-route.js"
import { userRoutes } from "./user-route.js"
import { orderRoutes } from "./order-route.js"
import { paymentRoute } from "./payment-route.js"

const routing = express.Router()

routing.use("/products", productRoutes)
routing.use("/user", userRoutes)
routing.use("/orders", orderRoutes)
routing.use("/payment", paymentRoute)

export default routing