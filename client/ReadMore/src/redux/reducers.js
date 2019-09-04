/**
 * @flow
 */
import type {BooksItem, Action} from './type'
import { combineReducers } from 'redux'
import {ADD_BOOKSLIST} from './actions'

type Reducer<S, A> = (state: S, action: A) => S

const addBooksList: Reducer<BooksItem[], Action> = (state = [], action) => {
    switch(action.type){
        case ADD_BOOKSLIST:
            return [
                ...state,
                ...action.list
            ]
        default: 
            return state
    }
}

const readMoreApp = combineReducers({
    booksList: addBooksList
})

export default readMoreApp