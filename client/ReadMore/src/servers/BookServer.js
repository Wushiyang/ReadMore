import { bookList } from '../mocker/data'

class BookServer{
    static Instance = new BookServer()
    getBooksList(){
        return bookList
    }
}
export default BookServer.Instance