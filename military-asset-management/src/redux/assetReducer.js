const assetReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ASSETS':
      return action.payload;
    case 'ADD_ASSET':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default assetReducer;
