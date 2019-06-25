"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var express = require("express");
// const express = require('express')
var Web = /** @class */ (function () {
    function Web() {
        this.app = express();
    }
    Web.prototype.run = function () {
        var server = this.app.listen(config_1.default.port, config_1.default.host, function () {
            var address = server.address();
            console.log("server run at " + address.address + ":" + address.port);
        });
    };
    return Web;
}());
exports.default = new Web();
