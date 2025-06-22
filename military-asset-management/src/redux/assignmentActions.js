// src/redux/assignmentActions.js
export const SET_ASSIGNMENTS = 'SET_ASSIGNMENTS';
export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';

export const setAssignments = (assignment) => ({
  type: SET_ASSIGNMENTS,
  payload: assignment
});

export const addAssignment = (assignment) => ({
  type: ADD_ASSIGNMENT,
  payload: assignment
});

export const deleteAssignment = (id) => ({
  type: DELETE_ASSIGNMENT,
  payload: id
});
