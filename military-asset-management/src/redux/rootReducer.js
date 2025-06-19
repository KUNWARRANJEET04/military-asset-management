import { combineReducers } from 'redux';
import assetReducer from './reducer';
import purchaseReducer from './purchaseReducer'; // ✅

const rootReducer = combineReducers({
  assets: assetReducer,
  purchases: purchaseReducer, // ✅
});

export default rootReducer;
