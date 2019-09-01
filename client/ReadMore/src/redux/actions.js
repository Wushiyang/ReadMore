export const ADD_BOOKSLIST = 'ADD_BOOKSLIST'

function addBooksList(booksList){
    return {
        type: ADD_BOOKSLIST,
        booksList
    }
}

export {
    addBooksList
}