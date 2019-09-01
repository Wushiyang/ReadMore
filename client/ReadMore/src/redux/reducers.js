import { combineReducers } from 'redux'
import {ADD_BOOKSLIST} from './actions'

function addBooksList(state = [], action){
    switch(action.type){
        case ADD_BOOKSLIST:
            return [
                ...state,
                ...action.booksList
            ]
        default: 
            return state
    }
}

const readMoreApp = combineReducers({
    booksList: addBooksList
})

export default readMoreApp