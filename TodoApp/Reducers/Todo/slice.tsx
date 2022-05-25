import TodoInterface from '../../Interfaces/TodoInterface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TodoInterface[] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoAdd: (state, action: PayloadAction<TodoInterface>) => {
      console.log('adding... ', action.payload);
      state.push(action.payload);
    },
    todoUpdate: (state, action: PayloadAction<TodoInterface>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      console.log('Updating...', index, state[index], action.payload);
      state[index] = action.payload;
    },
    todoRemove: (state, action: PayloadAction<TodoInterface>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {todoAdd, todoUpdate, todoRemove} = todoSlice.actions;

export default todoSlice.reducer; // default export!!
