import { createConnection, ConnectionOptions, Connection, Schema } from 'mongoose'
import { dbcfg } from '../../config'

interface ISchemaConstructor{
    new (opt?: Object)
    collection: string
    schema
}

export default class BaseModel{

    private sh

    static db: Connection & {
        then: Promise<Connection>["then"]
        catch: Promise<Connection>["catch"]
    }

    public constructor(option: ConnectionOptions){
        BaseModel.db = createConnection(`mongodb://${dbcfg.host}:${dbcfg.port}/${dbcfg.db}`, {
            useNewUrlParser: true,
            ...option
        })
    }

    //暂时用不到
    // public schema(option?: Object){
    //     //暂时没更好的类型检测方法
    //     if (!(this.constructor as ISchemaConstructor).collection) {
    //         throw new Error('声明的model缺少collection静态属性')
    //     }
    //     return BaseModel.db.collection((this.constructor as ISchemaConstructor).collection, option)
    // }

    public model(option?: Object){
        const collection = (this.constructor as ISchemaConstructor).collection
        const schema = (this.constructor as ISchemaConstructor).schema
        if (!collection) {
            throw new Error('声明的model缺少collection静态属性')
        }
        return BaseModel.db.model(collection, new Schema(schema, option), collection)
    }
}
