import React, { useState } from "react";
import "./UserOptions.css";
import {
    SpeedDial,
    SpeedDialAction,
    Backdrop,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    MdDashboard,
    MdLogout,
    MdListAlt,
    MdPerson,
    MdShoppingCart,
} from "react-icons/md";
import { logout } from "../../../Actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

const UserOptions = ({ data, loading }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();

    const { cartItems } = useSelector((state) => state.cart);

    const dashboard = () => {
        navigate("/admin/dashboard");
    };
    const orders = () => {
        navigate("/orders");
    };
    const account = () => {
        navigate("/profile");
    };

    const cart = () => {
        navigate("/cart");
    };

    const logoutUser = () => {
        dispatch(logout());
        alert.success("logged out successfully");
    };

    const options = [
        { icon: <MdListAlt />, name: "Orders", func: orders },
        { icon: <MdPerson />, name: "Profile", func: account },
        {
            icon: <MdShoppingCart style={{color: cartItems.length > 0 ? "tomato" : "black"}}/>,
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <MdLogout />, name: "Logout", func: logoutUser },
    ];
    if (data.role === "admin") {
        options.unshift({
            icon: <MdDashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Backdrop open={open} style={{ zIndex: "10" }} />
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        direction="down"
                        className="speedDial"
                        sx={{ height: 50 }}
                        icon={
                            <img
                                className="speedDialIcon"
                                src={data.avatar.url}
                                alt="profile"
                            />
                        }
                    >
                        {options.map((items) => (
                            <SpeedDialAction
                                key={items.name}
                                icon={items.icon}
                                tooltipTitle={items.name}
                                onClick={items.func}
                                tooltipOpen= {window.innerWidth <= 600 ? true : false}
                            />
                        ))}
                    </SpeedDial>
                </>
            )}
        </>
    );
};

export default UserOptions;
