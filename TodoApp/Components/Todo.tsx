import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import TodoInterface from '../Interfaces/TodoInterface';

import ContextMenu from 'react-native-context-menu-view';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Reducers/Todo/store';
import {todoAdd, todoUpdate, todoRemove} from '../Reducers/Todo/slice';

import {TODO_MAX_LENGTH} from '../Utils/Todo/validator';

import {stylesModalButton} from '../Styles/ModalButtons';

const Todo = (props: {todo: {item: TodoInterface}}) => {
  // Redux
  const todos = useSelector((state: RootState) => state.todo);
  const dispatchTodo = useDispatch();

  const [todoText, setTodoText] = useState<string>(props.todo.item.text);
  const [tempTodoText, setTempTodoText] = useState<string>(
    props.todo.item.text,
  ); // Utilisé pour la modification du texte

  const [showModalTodoChangeText, setShowModalTodoChangeText] =
    useState<boolean>(false);

  // Commencer modification texte
  const handleUpdateTodoTextStart = () => {
    setShowModalTodoChangeText(true);
  };

  // Finir modification texte
  const handleUpdateTodoTextEnd = () => {
    console.log('Set to >> ', tempTodoText);
    if (
      tempTodoText.trim().length <= 0 ||
      tempTodoText.trim().length > TODO_MAX_LENGTH
    ) {
      return;
    }
    // Update todo
    dispatchTodo(
      todoUpdate({
        id: props.todo.item.id,
        text: tempTodoText,
        done: props.todo.item.done,
      }),
    );

    // Changer texte todo
    setTodoText(tempTodoText);

    // Fermer modal
    setShowModalTodoChangeText(false);
  };

  // Supprimer todo
  const handleTodoDelete = () => {
    Alert.alert(
      'Êtes vous sur de vouloir supprimer ?',
      'La supression est définitive.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            dispatchTodo(
              todoRemove({
                id: props.todo.item.id,
                text: props.todo.item.text,
                done: true,
              }),
            );
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <ContextMenu
      title="Options"
      actions={[
        {
          title: 'Modifier',
          destructive: false,
          systemIcon: 'mode_edit',
        },
        {
          title: 'Supprimer',
          destructive: true,
          systemIcon: 'minus.circle.fill',
        },
      ]}
      onPress={e => {
        if (e.nativeEvent.name === 'Supprimer') {
          handleTodoDelete();
        } else if (e.nativeEvent.name === 'Modifier') {
          handleUpdateTodoTextStart();
        }
      }}>
      <View style={styles['todos-container__todo']}>
        {/* Todo text */}
        <Text style={styles['todos-container__todo__text']}>{todoText}</Text>

        {/* Modal modifier le texte */}
        <Modal
          animationType={'fade'}
          onRequestClose={() => setShowModalTodoChangeText(false)}
          presentationStyle={'overFullScreen'}
          transparent={true} // Arrière plan transparent
          visible={showModalTodoChangeText}>
          <View style={stylesModal['modal-container']}>
            <View style={stylesModal['modal-container__content']}>
              {/* Titre */}
              <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                Modifier le texte
              </Text>

              {/* Text input */}
              <TextInput
                selectionColor={'black'}
                style={stylesModal['modal-container__content__input']}
                editable={true}
                placeholderTextColor={'black'}
                placeholder={'Texte...'}
                maxLength={TODO_MAX_LENGTH}
                defaultValue={todoText}
                autoCapitalize={'sentences'}
                onChangeText={value => {
                  setTempTodoText(value);
                }}
              />

              {/* boutons */}
              <View style={stylesModal['modal-container__content__buttons']}>
                <TouchableOpacity
                  onPress={e => setShowModalTodoChangeText(false)}>
                  <Text style={stylesModalButton.modalButtonSecondarySmall}>
                    Annuler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={e => handleUpdateTodoTextEnd()}>
                  <Text style={stylesModalButton.modalButtonMainSmall}>
                    Modifier
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ContextMenu>
  );
};

export default Todo;

const stylesModal = StyleSheet.create({
  'modal-container': {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    zIndex: 999,
  },
  'modal-container__content': {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  'modal-container__content__input': {
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
  'modal-container__content__buttons': {
    flexDirection: 'row',
  },
});

const styles = StyleSheet.create({
  'todos-container__todo': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    borderColor: '#31E981',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 20,
  },
  'todos-container__todo__text': {
    color: 'white',
    fontSize: 18,
  },
});
