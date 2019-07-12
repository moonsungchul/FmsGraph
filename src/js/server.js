"use strict";

var express = require('express');
var bodyParser = require('body-parser')
const log = require('electron-log')

class Server {
    
    constructor(port) {
        this._port = port
        this._app = express()
        this._app.use(bodyParser.urlencoded({extended:true}))
        this._app.use(bodyParser.json())
    }

    init() {
        this._app.get("/version", (req, res) => {
            res.send("Version 1.0")
        });

    }

    start() {
        this._app.listen(this._port, () => {
            console.log('Server listening on port 3000!')  
        });

    }

}

module.exports = Server
