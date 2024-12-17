import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Wellcome to Anecdotes App',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

