import React from 'react';
import { Text,StatusBar, StyleSheet, View } from 'react-native';
/* import RepositoryList from './RepositoryList'; */
import AppBar from '../components/AppBar'; // Verifica la ruta
import RepositoryList from '../components/RepositoryList';
import SingleRepositoryScreen from '../components/SingleRepositoryScreen';
import { useQuery } from '@apollo/client';
import { Route, Routes, NativeRouter,Switch, Redirect } from 'react-router-native';; 
import SignIn from './SignIn';
import SignOut from './SignOut';
import ReviewForm from '../components/ReviewForm';
import RepositoryListScreen from './RepositoryListScreen'; 
import MyReviews from './MyReviews';
import { GET_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Color de fondo para el contenedor
  },
  content: {
    flex: 1, // Asegura que el contenido ocupe solo el espacio necesario
    paddingHorizontal: 16, // Agrega espacio horizontal
    paddingTop: 16, // Espacio entre el TabBar y el formulario
  },

});

const Main = () => {
  const { data, loading } = useQuery(GET_USER);
  console.log("Main:::data ",data);
  console.log("Main:::loading ",loading);
  if (loading) {
    return null; // Mostrar un indicador de carga
  }

  const isLoggedIn = !!data?.me;
  console.log("Main:::isLoggedIn ",isLoggedIn);
  return (
    <View style={styles.container}>
      <AppBar />
      {/* <NativeRouter> */}
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/repository/:id" element={<SingleRepositoryScreen />} />
          <Route path="/create-review" element={<ReviewForm />} />
          <Route path="/Repository-list-screen" element={<RepositoryListScreen />} />  
          <Route path="/my-reviews" component={MyReviews} exact />
        </Routes>
      {/* </NativeRouter> */}
      <View style={styles.content}>
        {isLoggedIn ? <RepositoryList /> :<SignIn/> }
        </View>
      {/* {isLoggedIn ? alert("listado") : alert("Formulario") } */}
    </View>
  );
};

export default Main;