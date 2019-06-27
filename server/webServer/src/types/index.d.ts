import mongoose = require('mongoose')
declare namespace WebServer {

    abstract class BaseModel {
        private db: Promise<typeof mongoose>
        private _init: () => void
        
    }
}