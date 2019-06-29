import express = require('express')

import BookInfoModel from '../data/model/bookInfo'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('path: /')
})

router.get('/bookinfo', (req, res, next) => {
    let book_info_model = new BookInfoModel()
    book_info_model.model().find(function(err, data){
        if (err) console.error(err)
        // res.send('path: /bookinfo')
        res.send(data)
    })
    // console.log(data)
    // res.send(JSON.stringify(data))
})


export default router