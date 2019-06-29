"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bookInfo_1 = require("../data/model/bookInfo");
var router = express.Router();
router.get('/', function (req, res, next) {
    res.send('path: /');
});
router.get('/bookinfo', function (req, res, next) {
    var book_info_model = new bookInfo_1.default();
    book_info_model.model().find(function (err, data) {
        if (err)
            console.error(err);
        // res.send('path: /bookinfo')
        res.send(data);
    });
    // console.log(data)
    // res.send(JSON.stringify(data))
});
exports.default = router;
