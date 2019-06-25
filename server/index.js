// const child_process = require('child_process');
const  { Worker } = require('worker_threads')
const express = require('express')
const fs = require('fs')
const path = require('path')
const Web = require('./web/index')

// const Log = function (req, res, next) {
//     console.log('LOGGED')
//     next()
// }

// const requestTime = function (req, res, next) {
//     req.requestTime = Date.now()
//     next()
// }

// app.use(requestTime)




// const server = app.listen(5041, 'localhost', () => {
//     let address = server.address()
//     console.log(`server run at ${address.address}:${address.port}`)
// })

// init()

// function init(){
//     fs.readFile('..config.json', (err, data) => {
//         if (err) {
//             throw err
//         }

//     })
// }

Web.run()

function crawlerLaunch(){
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
}