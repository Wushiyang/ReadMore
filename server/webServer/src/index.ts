import { svcfg } from './config'
import router from './router/index'
import express = require('express')
import net = require('net')
// const express = require('express')

class Web{
    private app: express.Express

    constructor(){
        this.app = express()
    }

    run() {
        const app = this.app
        app.use('/', router)
        const server = app.listen(svcfg.port, svcfg.host, () => {
            const address = <net.AddressInfo>server.address()
            console.log(`server run at ${address.address}:${address.port}`)
        })
    }
}

export default new Web()