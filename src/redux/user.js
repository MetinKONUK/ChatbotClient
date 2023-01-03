import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.userData = action.payload;
    },
    unsaveUser: (state) => {
      state.userData = null;
    }
  }
});

export const { saveUser, unsaveUser } = userSlice.actions;
export default userSlice.reducer;
