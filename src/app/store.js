import { configureStore } from '@reduxjs/toolkit';
import issueListReducer from '../redux/issueListReducer';

export const store = configureStore({
  reducer: {
    issueList: issueListReducer
  },
});
