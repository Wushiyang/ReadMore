import BaseServer from './baseServer'
import SysUserModel from '../model/sysUserModel'

export default class userServer extends BaseServer{
    constructor(){
        super()
    }

    getUserInfoById(uid: number | string){
        const  sys_model = new SysUserModel()

    }

    login(){

    }
}