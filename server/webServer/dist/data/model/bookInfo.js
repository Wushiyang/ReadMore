"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseModel_1 = require("./baseModel");
var BookInfo = /** @class */ (function (_super) {
    __extends(BookInfo, _super);
    function BookInfo(option) {
        return _super.call(this, option) || this;
    }
    BookInfo.schema = {
        name: String,
        author: String,
        w_num: Number,
        tags: [String],
        img: String,
        catalog: [{
                title: String,
                chapter: String,
                uri: String
            }]
    };
    BookInfo.collection = 'book_info';
    return BookInfo;
}(baseModel_1.default));
exports.default = BookInfo;
