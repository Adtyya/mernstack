import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGIST_FAIL,
  USER_REGIST_REQUEST,
  USER_REGIST_SUCCESS,
} from "../Constant/userConstant";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const regist =
  (name, email, password, file, defaultPict, setSucces) => async (dispatch) => {
    dispatch({ type: USER_REGIST_REQUEST });
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern_noteszipper");
    data.append("cloud_name", "dmz19yaoz");
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (file) {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dmz19yaoz/upload",
          data
        );
        const isRegist = await axios.post(
          "/api/user",
          {
            name: name,
            password: password,
            email: email,
            picture: res.data.url.toString(),
          },
          config
        );
        dispatch({ type: USER_REGIST_SUCCESS, payload: isRegist.data });
      }
      if (!file) {
        const isRegist = await axios.post(
          "/api/user",
          {
            name: name,
            password: password,
            email: email,
            picture: defaultPict,
          },
          config
        );
        dispatch({ type: USER_REGIST_SUCCESS, payload: isRegist.data });
      }
      setSucces(true);
    } catch (error) {
      dispatch({
        type: USER_REGIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
