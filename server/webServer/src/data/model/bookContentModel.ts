import baseModel from './baseModel'

export default class BookContentModel extends baseModel{

    static schema = {
        title: String,
        content: String
    }

    static collection = 'book_content'

    constructor(option?: Object){
        super(option)
    }
}