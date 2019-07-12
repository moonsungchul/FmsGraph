"use strict"


class Common {

    constructor() {
        this._url = "http://localhost:3000"
    }


    getURL() {
        return this._url
    }
}


module.exports = Common