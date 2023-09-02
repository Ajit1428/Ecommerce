import React, { useEffect, useState } from "react";
import "./ForgetPassword.css";
import Loader from "../../Loader/Loader";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    clearMessage,
    forgetPassword,
} from "../../../Actions/userAction";
import { useAlert } from "react-alert";
import Metadata from "../../MetaData/Metadata";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector(
      (state) => state.forgetUserPassword
  );

    const [email, setEmail] = useState("")

  const forgetUserPassword = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("email", email);
      dispatch(forgetPassword(myForm));
  };

  useEffect(() => {
      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }

      if(message){
        alert.success(message);
        navigate("/")
        dispatch(clearMessage());
      }

  }, [dispatch, error, alert, navigate, message]);
  return (
    <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title="Forget Password" />
                    <div className="forgetPasswordContainer">
                        <div className="forgetPasswordBox">
                            <h2 className="forgetPasswordHeading">Forget Password</h2>
                            <form
                                className="forgetPasswordForm"
                                onSubmit={forgetUserPassword}
                            >
                               <div>
                                    <MdMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <button type="submit" className="forgetPasswordBtn">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
  )
}

export default ForgetPassword