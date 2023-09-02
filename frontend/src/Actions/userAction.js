import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGE,
} from "../Constants/userConstants";

// const uri = "https://ecommerce-website-mltf.onrender.com"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true};
        const { data } = await axios.post(
            `/api/v1/user/login`,
            { email, password },
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.result.user,
            msg: data.msg,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { header: { "Content-Type": "multipart/form-data" } , withCredentials: true};
        const { data } = await axios.post(
            `/api/v1/user/register`,
            userData,
            config
        );
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.result,
            msg: data.msg,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`/api/v1/user/me`);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.result });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/user/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { header: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.patch(
            `/api/v1/user/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.msg });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.patch(
            `/api/v1/user/password/update`,
            passwords,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.msg });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/user/password/forget`,
            email,
            config
        );
        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.msg });
    } catch (error) {
        dispatch({
            type: FORGET_PASSWORD_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/user/password/reset/${token}`,
            passwords,
            config
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.msg });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.msg,
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/api/v1/user/admin/all/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.result });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/user/admin/all/${id}`);
      console.log(data)
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.result });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.msg });
    }
  };

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.patch(
            `/api/v1/user/admin/role/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.msg });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        console.log(id)

        const { data } = await axios.delete(`/api/v1/user/admin/all/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};
