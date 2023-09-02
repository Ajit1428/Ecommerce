import Stripe from "stripe";

class PaymentController {
    processPayment = async (req, res, next) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const myPayment = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "usd",
                payment_method_types: ["card"],
                metadata: {
                    company: "Ecommerce",
                },
            });
            res.json({
                status: true,
                client_secret: myPayment.client_secret,
            });
        } catch (error) {
            next({ status: 401, msg: `${error}` });
        }
    };

    sendStripeApiKey = async(req,res,next) => {
        try {
            res.json({
                status: true,
                stripeApiKey: process.env.STRIPE_API_KEY
            })
        } catch (error) {
            next({ status: 401, msg: `Stripe Api : ${error.msg}` });
        }
    }
}

const paymentCon = new PaymentController();
export default paymentCon;
