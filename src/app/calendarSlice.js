import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../data/dummyData";

const initialState = {
  data: dummyData,
  selectedDate: null
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    }
  }
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
