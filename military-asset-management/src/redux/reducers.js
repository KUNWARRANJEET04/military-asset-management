import { combineReducers } from 'redux';
import assetReducer from './assetReducer';
import purchaseReducer from './purchaseReducer';
import assignmentReducer from './assignmentReducer';
import transferReducer from './transferReducer';

const rootReducer = combineReducers({
  assets: assetReducer,
  purchases: purchaseReducer,
  assignments: assignmentReducer,
  transfers: transferReducer, // ✅ Make sure this is added
});

export default rootReducer;
