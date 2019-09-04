/**
 * @flow
 */
export type BooksItem = {
    img: ?string,
    name: string,
    ext: string,
    path: string
}

 export type Action = 
 | { type: "ADD_BOOKSLIST", list: BooksItem[] }
 | { type: "TEST_ACCTION", data: string }
