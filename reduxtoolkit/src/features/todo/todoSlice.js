import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos :[{id:1,text:"Hello world"}]
}



export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (state , action) => {
            const todo = {
                id :nanoid(),
                text : action.payload
            }

            state.todos.push(todo);
            state.todos
        },
        removeTodo : (state , action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload)
        },
        updateTodo : (state,action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo,text : action.payload.text}:todo)
        }
    }
})
export const {addTodo,removeTodo} = todoSlice.actions
const todoReducer = todoSlice.reducer;
export default todoReducer