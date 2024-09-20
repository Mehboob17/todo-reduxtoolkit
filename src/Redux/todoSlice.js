import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      todo: "Hello World",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, payload) => {
      const todo = {
        id: nanoid(),
        todo: payload.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, payload) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload.payload);
    },
    updateTodo: (state, payload) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === payload.payload.index
      );

      state.todos[todoIndex].todo = payload.payload.newTodo;
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
