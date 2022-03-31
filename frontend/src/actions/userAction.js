import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGIST_FAIL,
  USER_REGIST_REQUEST,
  USER_REGIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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
            idPicture: res.data.public_id,
          },
          config
        );
        console.log(res.data.public_id);
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

export const updateUser =
  (name, email, password, file, imgId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "mern_noteszipper");
      form.append("cloud_name", "dmz19yaoz");
      if (file) {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dmz19yaoz/upload",
          form
        );
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const value = {
          name: name,
          email: email,
          password: password,
          picture: res.data.url.toString(),
          idPicture: res.data.public_id,
          currentPicture: imgId,
        };
        const { data } = await axios.post(`/api/user/profile`, value, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const value = {
          name: name,
          email: email,
          password: password,
        };
        const { data } = await axios.post(`/api/user/profile`, value, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
