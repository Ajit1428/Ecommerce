import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../../Loader/Loader";
import { MdLock, MdVpnKey } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    resetPassword,
} from "../../../Actions/userAction";
import { useAlert } from "react-alert";
import Metadata from "../../MetaData/Metadata";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const {token} = useParams()
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, success } = useSelector(
        (state) => state.forgetUserPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetUserPassword = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, error, alert,  navigate, success]);
  return (
    <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Reset Password</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetUserPassword}
                            >
                               <div>
                                    <MdVpnKey />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <MdLock />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <button type="submit" className="resetPasswordBtn">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
  )
}

export default ResetPassword