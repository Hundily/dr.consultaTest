console.disableYellowBox = true;

import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// import reducers from './src/reducers';

import MainScreen from "./src/screens/MainScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import ComicsScreen from "./src/screens/ComicsScreen";
import InviteMeScreen from "./src/screens/InviteMeScreen";

const App = () => (
  // <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
  <Router>
    <Stack key="root">
      <Scene key="main" hideNavBar gesturesEnabled={false} component={MainScreen} />
      <Scene key="home" hideNavBar component={HomeScreen} />
      <Scene key="favorite" hideNavBar component={FavoriteScreen} />
      <Scene key="comics" component={ComicsScreen} />
      <Scene key="invite" component={InviteMeScreen} />
    </Stack>
  </Router>
  // </Provider>
);

export default App;