export const SET_TRANSFERS = 'SET_TRANSFERS';
export const ADD_TRANSFER = 'ADD_TRANSFER';
export const DELETE_TRANSFER = 'DELETE_TRANSFER';

export const setTransfers = (transfers) => ({
  type: SET_TRANSFERS,
  payload: transfers,
});

export const addTransfer = (transfer) => ({
  type: ADD_TRANSFER,
  payload: transfer,
});

export const deleteTransfer = (id) => ({
  type: DELETE_TRANSFER,
  payload: id,
});
