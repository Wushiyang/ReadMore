/**
 * @flow
 */
import type {Action, BooksItem} from './type' 
export const ADD_BOOKSLIST = 'ADD_BOOKSLIST'

function addBooksList(list: BooksItem[]): Action{
    return {
        type: ADD_BOOKSLIST,
        list
    }
}

export {
    addBooksList
}