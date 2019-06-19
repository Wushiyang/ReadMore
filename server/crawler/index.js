const Crawler = require('crawler')
const path = require('path')
const fs = require('fs')
let config

fs.readFile(path.join(__dirname, './config.json'), {
    encoding: 'utf8'
}, (err, data) => {
    if (err) {
        throw err
    } else {
        config = JSON.parse(data)
        // global
        init()
    }
})


function init() {
    let c = new Crawler({
        maxConnections : config.maxConnections,
        callback : function (error, res, done) {
            if (error) {
                console.log(error)
            } else {
                console.log('had crawler success!')
                console.log('more operation at excutors!')
            }
            done()
        }
    })

    require('./excutors').then((res) => {
        start(res)
    }).catch(rej => {
        console.error('excutors launch fail')
    })
}

function start (excutors) {
    excutors.forEach((val, ind) => {
        if (typeof val === 'object') {
            if (val.launch) {
                excute(val)
            }
        } else {
            console.error('excutor must be a object!')
        }
    })

    function excute(excutor){
        let option = {
            uri: excutor.uri
        }
        if (typeof excutor.encoding === 'undefined') {
            option.callback = excutor.callback
        }
        if (typeof excutor.encoding === 'undefined') {
            option.encoding = excutor.encoding
        }
        if (typeof excutor.jQuery === 'undefined') {
            option.jQuery = excutor.jQuery
        }    
        c.queue(option)
    }
}
