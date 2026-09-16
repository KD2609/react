import {createContext,useContext} from 'react'

export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            title : "Learn React",
            completed : false
        }
    ],
    addTodo: (todo) => {},
    removeTodo: (id) => {},
    toggleTodo: (id) => {},
    updateTodo: (id, updatedTodo) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoContextProvider = TodoContext.Provider