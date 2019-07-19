
const pinyin = require('pinyin')

function fitIndex (str) {
    const first = str.substr(0, 1)
    const testCN = /[\u4E00-\u9FFF]+/
    const testEN = /[a-zA-Z]+/
    if (testCN.test(first)) {
        const retval = pinyin(str, {
            style: pinyin.STYLE_FIRST_LETTER
        })
        return retval.toUpperCase()
    }
    if (testEN.test(first)) {
        const retval = first
        return retval.toUpperCase()
    }
    return '#'
}

export { pTd } from './fit'
export { 
    fitIndex 
}
