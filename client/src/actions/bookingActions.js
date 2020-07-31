/** @format */

import axios from "axios";
import {setAlert} from './alert';
import {
  GET_BOOKING,
  ADD_BOOKING,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  SET_CURRENT,
  CLEAR_CURRENT,
  PROFILE_ERROR,
} from './types';


export const getBookings = () => (dispatch) => {
  axios.get("/api/bookings").then((res) =>
    dispatch({
      type: GET_BOOKING,
      payload: res.data,
    })
  );
};

export const addBookings = (bookings) => async (dispatch) => {
  try {
    await axios.post("/api/bookings", bookings).then((res) =>
      dispatch({
        type: ADD_BOOKING,
        payload: res.data,
      })
    );
    dispatch(setAlert("Bookings added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Login Error", "danger"));
  }
};

export const deleteBooking = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/bookings/${id}`).then((res) =>
      dispatch({
        type: DELETE_BOOKING,
        payload: id,
      })
    );
    dispatch(setAlert("Booking deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });

    dispatch(setAlert('Login Error', 'danger'));
  }
};

export const updateBookings = (bookings) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .put(`/api/bookings/${bookings.id}`, bookings, config)
      .then((res) =>
        dispatch({
          type: UPDATE_BOOKING,
          payload: res.data,
        })
      );
    dispatch(setAlert("Contact Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Login Error", "danger"));
  }
};

export const clearCurrent = (contact) => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const setCurrent = (contact) => {
  return {
    type: SET_CURRENT,
    payload: contact,
  };
};

// export const setItemsLoading = () => {
//     return {
//         type: ITEMS_LOADING
//     };
// };
