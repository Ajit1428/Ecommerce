import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    deleteUpdateProductReducer,
    productReviewsReducer,
    reviewReducer,
} from "./Reducers/productReducers";
import {
    allUsersReducer,
    forgetPasswordReducer,
    updateProfileReducer,
    userDetailsReducer,
    userReducer,
} from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from "./Reducers/orderReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profileUpdate: updateProfileReducer,
    forgetUserPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    newProduct: newProductReducer,
    deleteUpdate: deleteUpdateProductReducer,
    order: orderReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
            shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {}
    },

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
