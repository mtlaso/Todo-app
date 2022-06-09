/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useReducer, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Platform,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import TodoInterface from './Interfaces/TodoInterface';

import AddTodo from './Components/AddTodo';
import Todo from './Components/Todo';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './Reducers/Todo/store';

const App = () => {
  // Redux
  const todos = useSelector((state: RootState) => state.todo);
  const dispatchTodo = useDispatch();

  const [todoTitle, setTodoTitle] = useState('🍊 Titre');

  useEffect(() => {
    console.log('new data : ', todos);
  }, [todos]);

  return (
    <SafeAreaView style={{backgroundColor: '#131515', height: '100%'}}>
      <View style={styles['app-container']}>
        <View style={styles['todos-container']}>
          {/* Logo */}
          <View>
            <TextInput
              style={styles.logo}
              value={todoTitle}
              editable
              onChangeText={text => setTodoTitle(text)}
              autoCapitalize={'words'} // first letter of each word
              maxLength={30}
              multiline
            />
          </View>

          {/* Todos */}
          <View style={styles['todos-container__todos']}>
            <FlatList
              data={todos}
              keyExtractor={(todo: TodoInterface, index) => todo.id.toString()}
              renderItem={todo => <Todo todo={todo} key={todo.item.id} />}
            />
          </View>
        </View>

        {/* Add todo ('addtodo-container') */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles['addtodo-container']}>
          <AddTodo />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    textAlign: 'left',
    fontSize: 32,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  'app-container': {
    marginBottom: 35,
    flex: 1,
  },
  'todos-container': {
    flex: 8,
    margin: 35,
  },
  'todos-container__todos': {
    marginTop: 20,
  },
  'addtodo-container': {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 35,
    zIndex: 10,
  },
});

export default App;
