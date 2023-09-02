import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../../Loader/Loader";
import { MdOutlineLockOpen, MdLock, MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    updatePassword,
} from "../../../Actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../Constants/userConstants";
import { useAlert } from "react-alert";
import Metadata from "../../MetaData/Metadata";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, isUpdated } = useSelector(
        (state) => state.profileUpdate
    );

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateUserPassword = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate]);
  return (
    <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>
                            <form
                                className="updatePasswordForm"
                                onSubmit={updateUserPassword}
                            >
                               <div>
                                    <MdVpnKey />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <MdOutlineLockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
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
                                <button type="submit" className="updatePasswordBtn">
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
  )
}

export default UpdatePassword