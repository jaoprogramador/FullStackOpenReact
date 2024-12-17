import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  message: '',
  type: '', // Puedes usar 'success', 'error', etc.
  isVisible: false,
};

// Crear el slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.isVisible = false;
      state.message = '';
      state.type = '';
    },
  },
});

// Exportar las acciones
export const { showNotification, hideNotification } = notificationSlice.actions;

// Exportar el reductor
export default notificationSlice.reducer;
