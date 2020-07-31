/** @format */

import {GET_BOOKING, ADD_BOOKING, DELETE_BOOKING, UPDATE_BOOKING, SET_CURRENT, CLEAR_CURRENT} from '../actions/types';

const initialState = {
  bookings: [],
  current: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKING:
      return {
        ...state,
        bookings: action.payload
      };
    case DELETE_BOOKING:
      return {
          ...state,
          bookings: state.bookings.filter(booking => booking._id !== action.payload)
      }

    case ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };

      case UPDATE_BOOKING:
        return {
            ...state,
            bookings: state.bookings.map(booking => booking.id === action.payload ? action.payload : booking)
        }
        case SET_CURRENT:
          return {
              ...state,
              current: action.payload
          }

      case CLEAR_CURRENT:
          return {
              ...state,
              current: null
          }
    default:
      return state;
  }
}
