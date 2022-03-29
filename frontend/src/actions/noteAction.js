import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESSS,
} from "../Constant/notesConstant";
import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/notes`, config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const postNotes = (title, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const value = { title: title, content: content };
    const { data } = await axios.post("/api/notes/create", value, config);
    dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateNotes =
  (id, title, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const value = { title: title, content: content };
      const { data } = await axios.put(`/api/notes/${id}`, value, config);
      dispatch({ type: NOTES_UPDATE_SUCCESSS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNotes = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/notes/${id}`, config);
    dispatch({ type: NOTES_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_UPDATE_FAIL,
      payload: message,
    });
  }
};
