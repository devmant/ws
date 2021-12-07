import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issues: []
};


export const issueList = createSlice({
  name: 'issueList',
  initialState,
  reducers: {
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
  }
});

export const { setIssues } = issueList.actions;

export const selectIssues = (state) => state.issueList.issues;

export default issueList.reducer;
