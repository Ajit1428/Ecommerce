import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import ProfilePreview from "../../../Images/ReviewProfile.png";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    loadUser,
    updateProfile,
} from "../../../Actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../Constants/userConstants";
import { useAlert } from "react-alert";
import { MdMailOutline, MdFace } from "react-icons/md";
import Metadata from "../../MetaData/Metadata";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.user);
    const { error, loading, isUpdated } = useSelector(
        (state) => state.profileUpdate
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(ProfilePreview);

    const profileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const profileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setEmail(data.email);
            setAvatarPreview(data.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate, data]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Metadata title="Update Profile" />
                    <div className="profileContainer">
                        <div className="profileBox">
                            <h2 className="updateHeading">Update Profile</h2>
                            <form
                                className="updateForm"
                                encType="multipart/form-data"
                                onSubmit={profileSubmit}
                            >
                                <div>
                                    <MdFace />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <MdMailOutline />
                                    <input
                                        readOnly
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                    />
                                </div>
                                <div id="profileImage">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={profileDataChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="updateProfileBtn"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UpdateProfile;
