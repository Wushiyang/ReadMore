import mongoose = require('mongoose')
import { dbcfg } from '../../config'
class BaseModel {
    private db: Promise<typeof mongoose>

    constructor(){
        this._init()
    }
    private _init(){
        this.db = mongoose.connect(dbcfg.host)
    }
}