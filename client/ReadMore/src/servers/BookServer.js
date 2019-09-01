import { bookList } from '../mocker/data.json'
import DeviceStorage from '../components/DeviceStorage'

export default class BookServer{
    static getBooksList(){
        return DeviceStorage.get('bookList').then(bookList => {
            if (bookList === '' || bookList == undefined) {
                bookList = []
                DeviceStorage.save('bookList', bookList)
                return bookList
            }
            return bookList
        })
    }

    static updateBooksList(value){
        return DeviceStorage.update('bookList', value)
    }
}