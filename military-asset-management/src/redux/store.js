import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './slices/assetsSlice'; // example reducer

const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
});

export default store;
