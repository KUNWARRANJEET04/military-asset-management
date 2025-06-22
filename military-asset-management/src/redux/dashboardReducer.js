import { SET_DASHBOARD_STATS } from './dashboardActions';

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DASHBOARD_STATS:
      return action.payload;
    default:
      return state;
  }
};

export default dashboardReducer;
