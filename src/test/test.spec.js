"use strict";

const log = require('electron-log')
var graphFileReader = require('../js/graphFileReader')

test('This is a sample', () => {
    log.info("test")    

    var fname = "data/kegg_short.out"
    var oo = new graphFileReader(fname) 
    log.info(oo.getFile)
    oo.readData1()
    
});