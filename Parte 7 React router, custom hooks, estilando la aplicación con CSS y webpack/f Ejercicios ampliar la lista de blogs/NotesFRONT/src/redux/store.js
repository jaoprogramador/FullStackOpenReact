import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import notificationReducer from './notificationSlice';
import blogReducer from './blogSlice'; 
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,//NOTIFICACION 
    blog: blogReducer, // BLOG
    users: userReducer // USER 

  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
