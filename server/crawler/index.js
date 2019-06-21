const child_process = require('child_process')
const path = require('path')
const fs = require('fs')
const utils = require('./utils')
let config

console.log('crawler 开启')
//异步读取config
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

//初始化config
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

//启动excutor子线程
function launch() {

    let excutor = child_process.fork(path.join(__dirname,'./excutors/index.js'))

    excutor.on('message', (data) => {
        if (data.type === 'hadInit') {
            console.log('[crawler.excutor] had started')
            excutor.send({type: 'exec', exec: 'qidian', url: 'https://book.qidian.com/info/1014130981#Catalog'})
        }

        if (data.type === 'data') {
            executeData(data.data)
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

function executeData(data){
    let date = new Date()
    let y = date.getFullYear()
    let m = utils.addZero(date.getMonth() + 1)
    let d = date.getDate()
    let dir = path.join(config.downloadPath, `./${y}`)

    //保存原本到本地
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    dir += `/${m}`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    dir += `/${d}`    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    let dir2 = dir + `/${y}${m}${d}-${data.source}-${data.title}-dbdata.json`
    dir += `/${y}${m}${d}-${data.source}-${data.title}.json`
    fs.writeFile(dir, JSON.stringify(data.raw, "", "\t"), (err) => {
        if (err) {
            console.error(err)
        }
    })
    //上传到服务器
    fs.writeFile(dir2, JSON.stringify(data.dbdata, "", "\t"), (err) => {
        if (err) {
            console.error(err)
        }
    })
}
