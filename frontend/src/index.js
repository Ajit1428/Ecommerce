import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout:5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}



createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>
        </Provider>   
);
