{/*
const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.data;
      default:
        return state;
    }
  };
  
  // Action creator para cambiar el filtro
  export const setFilter = (filter) => {
    return {
      type: 'SET_FILTER',
      data: filter,
    };
  };
  
  export default filterReducer;*/}
  import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del filtro
const initialState = '';

// Crear slice para el filtro
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload; // Establecer el filtro basado en la acción despachada
    },
  },
});

// Exportar las acciones generadas por el slice
export const { setFilter } = filterSlice.actions;

// Exportar el reducer por defecto
export default filterSlice.reducer;

  