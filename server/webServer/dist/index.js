"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var index_1 = require("./router/index");
var express = require("express");
// const express = require('express')
var Web = /** @class */ (function () {
    function Web() {
        this.app = express();
    }
    Web.prototype.run = function () {
        var app = this.app;
        app.use('/', index_1.default);
        var server = app.listen(config_1.svcfg.port, config_1.svcfg.host, function () {
            var address = server.address();
            console.log("server run at " + address.address + ":" + address.port);
        });
    };
    return Web;
}());
exports.default = new Web();
