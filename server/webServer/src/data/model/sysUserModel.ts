import baseModel from './baseModel'

export default class SysUserModel extends baseModel{

    static schema = {
        booklist: [String],
        password: String,
        username: String,
        nickname: String
    }

    static collection = 'sys_user'

    constructor(option?: Object){
        super(option)
    }
}