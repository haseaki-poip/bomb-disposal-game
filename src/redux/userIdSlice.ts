import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
  name: "user",
  initialState: {
    userId: null as number | null,
  },
  reducers: {
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
