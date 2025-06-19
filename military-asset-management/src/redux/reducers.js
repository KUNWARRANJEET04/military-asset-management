// const initialState = {
//   vehicles: 0,
//   weapons: 0,
//   ammunition: 0,
//   transfers: 0,
//   recentTransfers: [],
// };

// export const assetsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_ASSETS':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };
// const initialState = {
//   assets: [],
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_ASSETS':
//       return { ...state, assets: action.payload };
//     default:
//       return state;
//   }
// };

// export default rootReducer;

// redux/reducers/index.js
import { combineReducers } from 'redux';
// import assetReducer from './assetReducer';
import purchaseReducer from './purchaseReducer';

const rootReducer = combineReducers({
//   assets: assetReducer,
  purchases: purchaseReducer,
});

export default rootReducer;
