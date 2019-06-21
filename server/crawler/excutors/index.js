// const qidian = require('./qidian')
const Crawler = require('crawler')
const fs = require('fs')
let excutors = {}, hadInit = false, crawler, config

process.on('message', (data) => {
    
    if (!hadInit && data.type === 'config') {
        config = data.data
        run()
    } else {
        //开始处理
        if (typeof excutors[data.exec] !== 'undefined') {

            excutors[data.exec](crawler.queue.bind(crawler), data.url).then((res) => {
                process.send({
                    type: 'data',
                    data: res
                })
            })

        } else {
            console.error('excutor not existed')
        }
    }
})

async function run(){
    startCrawler()
    await loadExcutors()
    console.log(excutors)

    hadInit = true
    process.send({
        type: 'hadInit'
    })
}

function startCrawler(){
    crawler = new Crawler({
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
}

function loadExcutors(){
    return new Promise(resolve => {
        fs.readdir(__dirname, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error(err)
            }
            files.forEach((val) => {
                if (val.isDirectory()) {
                    excutors[val.name] = require(`./${val.name}/index`)
                }
            })
            resolve()
        })
    })
}

/**
 * excutors return 
 * {
 *  raw: raw,
 *  dbdata: dbdata,
 *  source: qidian,
 *  title: title
 * }
 */