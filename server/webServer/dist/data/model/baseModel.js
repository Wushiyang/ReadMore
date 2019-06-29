"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var config_1 = require("../../config");
var BaseModel = /** @class */ (function () {
    function BaseModel(option) {
        BaseModel.db = mongoose_1.createConnection("mongodb://" + config_1.dbcfg.host + ":" + config_1.dbcfg.port + "/" + config_1.dbcfg.db, __assign({ useNewUrlParser: true }, option));
    }
    BaseModel.prototype.schema = function (option) {
        //暂时没更好的类型检测方法
        if (!this.constructor.collection) {
            throw new Error('声明的model缺少collection静态属性');
        }
        return BaseModel.db.collection(this.constructor.collection, option);
    };
    BaseModel.prototype.model = function (option) {
        var collection = this.constructor.collection;
        var schema = this.constructor.schema;
        if (!collection) {
            throw new Error('声明的model缺少collection静态属性');
        }
        return BaseModel.db.model(collection, new mongoose_1.Schema(schema, option), collection);
    };
    return BaseModel;
}());
exports.default = BaseModel;
