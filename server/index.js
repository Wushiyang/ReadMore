// const child_process = require('child_process');
const  { Worker } = require('worker_threads')
const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer((req, res) => {

    console.log(req)
    let crawler = new Worker('./crawler/index.js')
    crawler.on('message', value => {
        console.log(value)
    })
    crawler.on('error', err => {
        console.log(err)
    })
    crawler.on('exit', exitCode => {
        console.log(`code ${exitCode}: crawler had exited`)
    })
    crawler.on('online', () => {
        console.log(`crawler had connected`)
    })

    res.end('结束')
})
server.listen(5041, 'localhost', () => {
    let address = server.address()
    console.log(`server run at ${address.address}:${address.port}`)
})