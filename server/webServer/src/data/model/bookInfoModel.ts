
import baseModel from './baseModel'

export default class BookInfoModel extends baseModel{
    static schema = {
        name: String,
        author: String,
        w_num: Number,
        tags: [String],
        img: String,
        catalog: [{
            title: String,
            chapter: String,
            uri: String
        }]
    }

    static collection = 'book_info'

    constructor(option?: Object){
        super(option)
    }
}