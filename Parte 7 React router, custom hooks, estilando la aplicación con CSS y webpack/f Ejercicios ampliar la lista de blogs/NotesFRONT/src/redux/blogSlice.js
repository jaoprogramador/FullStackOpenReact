import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = {
  blogs: [], // Mantén la estructura inicial como un objeto con una propiedad 'blogs'
};

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const blogs = await blogService.getAll();
  return blogs;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload; // Actualiza los blogs en el estado
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload; // Actualiza el blog en el estado
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload); // Filtra el blog eliminado
      });
  },

});

// Exportar las acciones
export const { setBlogs, addBlog } = blogSlice.actions;

// Exportar el reductor
export default blogSlice.reducer;

// Acción asíncrona para dar "me gusta"
export const likeBlog = createAsyncThunk(
  'blog/likeBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const updatedBlog = await blogService.like(blogId);
      return updatedBlog;
    } catch (error) {
      console.log('likeBlog = createAsyncThunk',error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Acción asíncrona para eliminar un blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId) => {
    await blogService.remove(blogId);
    return blogId; // Retorna el ID para eliminarlo del estado
  }
);

