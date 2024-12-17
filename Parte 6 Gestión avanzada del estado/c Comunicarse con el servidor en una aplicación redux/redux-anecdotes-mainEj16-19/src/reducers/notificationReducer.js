import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes App', // Estado inicial
  reducers: {
    setNotification(state, action) {
      return action.payload; // Establece el mensaje de notificación
    },
    clearNotification() {
      return ''; // Limpia la notificación
    },
  },
});

// Exporta las acciones generadas por createSlice
export const { setNotification, clearNotification } = notificationSlice.actions;

// Action creator para establecer la notificación con un timeout
export const setNotificationWithTimeout = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(message)); // Establece la notificación

    // Limpia la notificación después de 'seconds' segundos
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

// Exporta el reducer
export default notificationSlice.reducer;




