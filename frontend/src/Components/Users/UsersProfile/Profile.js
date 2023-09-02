import React, { useEffect } from "react";
import "./Profile.css";
import Metadata from "../../MetaData/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

const Profile = () => {
    const { isAuthenticated, loading, data } = useSelector(
        (state) => state.user
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title={`${data.name}'s Profile`} />
                    <div className="containerProfile">
                        <div className="first__container">
                            <h1>My Profile</h1>
                            <img src={data.avatar.url} alt={data.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div className="second__container">
                            <div className="second__container__details">
                                <div>
                                    <h4>Full Name:</h4>
                                    <p>{data.name}</p>
                                </div>
                                <div>
                                    <h4>Email:</h4>
                                    <p>{data.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On:</h4>
                                    <p>
                                        {String(data.createdAt).substr(0, 10)}
                                    </p>
                                </div>
                                <div className="button__div">
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/password/update">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;
