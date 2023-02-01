import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: {},
};

export const accountDetail = (state) => state.account;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccountInfo: (state, action) => {
      console.log(state, action.payload);
    },
  },
});

export const { getAccountInfo } = accountSlice.actions;

export default accountSlice.reducer;
