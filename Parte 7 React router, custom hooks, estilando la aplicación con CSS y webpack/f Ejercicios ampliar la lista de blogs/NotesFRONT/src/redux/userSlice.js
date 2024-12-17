import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login'; // Asegúrate de que la ruta sea correcta
import userService from '../services/users';


// Estado inicial modificado para incluir `UserById`
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const user = await userService.getUserById(id); // Asume que tienes una función para obtener un usuario por su ID
      console.log('userSlice ',user)
      return user;
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

// Estado inicial modificado para incluir `user`
const initialState = {
  users: [], // Aquí se almacenará la información de los usuarios
  user: null, // Inicializa el usuario como null
  error: null, // Para manejar errores de inicio de sesión
  status: 'idle', // Para manejar el estado de la carga
};

// Acción para obtener todos los usuarios
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await userService.getAll();
  return users;
});

// Acción para iniciar sesión
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)); // Guarda el usuario en localStorage
      return user; // Retorna el usuario para actualizar el estado
    } catch (error) {
      return rejectWithValue('Login failed'); // Retorna el error si falla
    }
  }
);

// Creación del slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Establece el usuario en el estado
    },
    clearUser: (state) => {
      state.user = null; // Limpia el usuario del estado
      state.error = null; // Limpia el error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // Establece el usuario en el estado
        state.error = null; // Resetea el error
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Cambia el estado a "cargando"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Actualiza la lista de usuarios
        state.status = 'succeeded'; // Cambia el estado a "sucedido"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // Guarda el error si el login falla
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload; // Almacena el usuario específico en el estado
      });
  },
});

// Exporta las acciones
export const { setUser, clearUser } = userSlice.actions;

// Exporta el reductor
export default userSlice.reducer;
