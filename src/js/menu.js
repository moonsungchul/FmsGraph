
const { app, Menu, BrowserWindow, ipcMain} = require('electron');
const log = require('electron-log')
const {dialog} = require('electron')
const fs = require('fs')

var graphReader = require("./graphFileReader.js")
var Common = require("./common.js")

var common = new Common() 



class CMenuFunction {

  constructor(win) {
    this._win = win
  }

  onLoadFile() {
    var fname = dialog.showOpenDialog({properties:['openFile']})
    if(fs.existsSync(fname[0]) == true) {
      log.info("fame :", fname[0])
      var re = new graphReader(fname[0])
      re.readData()
      log.info("edges : ", re._edges)
      log.info("nodes : ", re._nodes)
      var ss = `file:///${__dirname}/../index.html`
      //this._win.webContents.loadURL(ss)
      //ipcMain.send('FileLoadMsg', 'ping')
      this._win.webContents.send('FileLoadMsg', re)

    }
  }

  onSaveFile() {
    log.info('You click Prefs-2')
    /*
    var fname = dialog.showSaveDialog({properties:['openFile']})
    log.info("fame :", fname) */
    //this._win.loadURL(`file:///${__dirname}/test.html`)
    //this._win.realod()
    var ss = `file:///${__dirname}/../test.html`
    log.info(">>>>>> ss : ", ss)
    this._win.webContents.loadURL(`file:///${__dirname}/../webapp/pages/testPage/test.html`)
    
  }
}


module.exports=CMenuFunction