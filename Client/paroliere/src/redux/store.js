import { configureStore } from '@reduxjs/toolkit';
import lettersReducer from './lettersSlice';

const store = configureStore({
  reducer: {
    letters: lettersReducer,
  }
});

export default store;
