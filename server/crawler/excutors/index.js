// const qidian = require('./qidian')
const path = require('path')
const fs = require('fs')
const filename = path.basename(__filename)

module.exports = new Promise( resolve => {
    let excutors = []
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            throw err
        }
        files.forEach(val => {
            if (val != filename) {
                excutors.push(require(path.join(__dirname, val)))
            }
        })
        resolve(excutors)
    })
})