export const SET_PURCHASES = 'SET_PURCHASES';
export const ADD_PURCHASE = 'ADD_PURCHASE';
export const DELETE_PURCHASE= 'DELETE_PURCHASE';
export const UPDATE_PURCHASE = 'UPDATE_PURCHASE';

export const setPurchases = (purchases) => ({
  type: SET_PURCHASES,
  payload: purchases,
});

export const addPurchase = (purchase) => ({
  type: ADD_PURCHASE,
  payload: purchase,
});

export const deletePurchase = (id) => ({
  type: DELETE_PURCHASE,
  payload: id,
});

export const updatePurchase = (purchase) => ({
  type: UPDATE_PURCHASE,
  payload: purchase,
});
