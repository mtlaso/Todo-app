import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import App from './App';

import {store} from './Reducers/Todo/store';
import {Provider} from 'react-redux';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({});
