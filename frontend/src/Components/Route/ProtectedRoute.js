import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isAdmin }) => {
    const { data,isAuthenticated, loading} = useSelector((state) => state.user);

    if (loading===false && isAuthenticated === false) {
        return <Navigate to="/login" />;
    }
    if(loading===false && isAdmin === true && data.role !=="admin"){
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
