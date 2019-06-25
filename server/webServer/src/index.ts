import config from './config'
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
        const server = app.listen(config.port, config.host, () => {
            const address = <net.AddressInfo>server.address()
            console.log(`server run at ${address.address}:${address.port}`)
        })
    }
}

export default new Web()