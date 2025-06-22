import {
  SET_TRANSFERS,
  ADD_TRANSFER,
  DELETE_TRANSFER,
} from './transferActions';

const transferReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSFERS:
      return action.payload;
    case ADD_TRANSFER:
      return [...state, action.payload];
    case DELETE_TRANSFER:
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
};

export default transferReducer;
