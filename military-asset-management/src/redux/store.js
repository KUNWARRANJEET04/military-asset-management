import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import dashboardReducer from './dashboardReducer';
// import other reducers as needed...

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  // ... other reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
