const child_process = require('child_process')
const path = require('path')
const fs = require('fs')
let config

console.log('crawler启动')

fs.readFile(path.join(__dirname, './config.json'), {
    encoding: 'utf8'
}, (err, data) => {
    if (err) {
        throw err
    } else {
        initConfig(data)
        launch()
    }
})

function initConfig(data){
    config = JSON.parse(data)
    const downloadPath = path.join(__dirname, config.downloadPath)
    config.downloadPath = downloadPath
    //判断下载目录是否存在，不存在如允许创建目录的话就创建目录
    if (!fs.existsSync(downloadPath)) {
        if (config.allowCreateDirectory) {
            try{
                fs.mkdirSync(downloadPath)
            }catch(e){
                throw e
            }
        } else {
            console.error(`not exist directory: ${downloadPath}`)
        }
    }
}

function launch() {

    let excutor = child_process.fork(path.join(__dirname,'./excutors/index.js'))

    excutor.on('message', (data) => {
        console.log(data)
        if (data.type === 'hadInit') {
            console.log('[crawler.excutor] had started')
            excutor.send({type: 'exec', url: 'https://book.qidian.com/info/1014130981#Catalog'})
        }

        if (data.type === 'msg') {
            console.log(data.data)
        }
    })
    excutor.send({
        type: 'config',
        data: config
    })
}
