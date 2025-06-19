import {
  SET_PURCHASES,
  ADD_PURCHASE,
  DELETE_PURCHASE,
  UPDATE_PURCHASE,
} from './purchaseActions';

const purchaseReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PURCHASES:
      return action.payload;
    case ADD_PURCHASE:
      return [...state, action.payload];
    case DELETE_PURCHASE:
      return state.filter((p) => p.id !== action.payload);
    case UPDATE_PURCHASE:
      return state.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    default:
      return state;
  }
};

export default purchaseReducer;
