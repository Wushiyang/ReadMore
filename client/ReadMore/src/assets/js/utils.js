const pinyin = require('pinyin')

// 获取字符串首字母对应索引
function fitIndex (str) {
    const first = str.substr(0, 1)
    const testCN = /[\u4E00-\u9FFF]+/
    const testEN = /[a-zA-Z]+/
    if (testCN.test(first)) {
        const retval = pinyin(str, {
            style: pinyin.STYLE_FIRST_LETTER
        })[0][0]
        return retval.toUpperCase()
    }
    if (testEN.test(first)) {
        const retval = first
        return retval.toUpperCase()
    }
    return '#'
}

// 美化字节
function beautySize(size){
    let excuteSize
    if ((excuteSize = size / (1024 * 1024)) > 1) {
        return excuteSize.toFixed(1) + ' MB'
    }
    if ((excuteSize = size / 1024) > 1) {
        return excuteSize.toFixed(1) + ' KB'
    }
}

function addZero(number){
    return number < 10? '0' + number : number
}

function getNowTime(){
    const data = new Date()
    return `${addZero(data.getHours())}:${addZero(data.getMinutes())}`
}

function countPageFontNumber(height, width, lineHeight, fontSize, txt){
    const cols = Math.floor(width / fontSize)
    const rows = Math.floor(height/lineHeight)
    let number = 0
    let pointList = [0]
    const reg = new RegExp(`[^\n]{0,${cols}}\n|[^\n]{${cols}}`, 'mg')
    txt.replace(reg, function(tg, pos, inp){
        ++number
        if(number === rows){
            pointList.push(pos + tg.length)
            number = 0
        }
    })
    if (txt.length > pointList[pointList.length]) {
        pointList.push(txt.length)
    }
    return pointList
}

export { pTd } from './fit'
export { 
    fitIndex,
    beautySize,
    getNowTime,
    countPageFontNumber
}
