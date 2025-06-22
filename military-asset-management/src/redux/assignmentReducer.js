// src/redux/assignmentReducer.js
import {
  SET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from './assignmentActions';

const assignmentReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ASSIGNMENTS:
      return action.payload;
    case ADD_ASSIGNMENT:
      return [...state, action.payload];
    case DELETE_ASSIGNMENT:
      return state.filter((assignment) => assignment.id !== action.payload);
    default:
      return state;
  }
};

export default assignmentReducer;
