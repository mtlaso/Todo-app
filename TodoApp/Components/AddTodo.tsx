import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useReducer, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Reducers/Todo/store';
import {todoAdd, todoUpdate, todoRemove} from '../Reducers/Todo/slice';

import {TODO_MAX_LENGTH} from '../Utils/Todo/validator';

const AddTodo = () => {
  const [todoText, setTodoText] = useState<string>('');

  // Redux
  const todos = useSelector((state: RootState) => state.todo);
  const dispatchTodo = useDispatch();

  const handleTodoAdd = () => {
    if (
      todoText.trim().length <= 0 ||
      todoText.trim().length > TODO_MAX_LENGTH
    ) {
      Alert.alert(
        "Erreur lors de l'ajout",
        `La texte doit être plus petit ou égal à ${TODO_MAX_LENGTH} charactères.`,
        [{text: 'OK'}],
      );
    } else {
      dispatchTodo(
        todoAdd({
          id: Math.floor(Math.random() * 100),
          text: todoText,
          done: false,
        }),
      );

      // Remettre texte à zéro
      setTodoText('');
    }
  };

  return (
    <>
      <TextInput
        placeholder={'Ajouter...'}
        placeholderTextColor={'#FFFFFF'}
        value={todoText}
        editable
        style={styles['input-container__input']}
        autoCapitalize={'sentences'} // first letter of each sentence
        maxLength={TODO_MAX_LENGTH}
        onChangeText={value => setTodoText(value)}
        clearTextOnFocus={true}
      />

      <TouchableOpacity
        style={styles['input-container__add']}
        onPress={event => {
          handleTodoAdd();
        }}>
        <Text style={styles['input-container__add__btn']}>+</Text>
      </TouchableOpacity>
    </>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  'input-container': {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 35,
    zIndex: 10,
  },

  'input-container__input': {
    flex: 8,
    marginRight: 20,
    padding: 20,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#31E981',
    color: '#FFFFFF',
  },
  'input-container__add': {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31E981',
    borderColor: '#31E981',
    borderRadius: 100,
  },
  'input-container__add__btn': {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
  },
});
