"use strict";

const log = require('electron-log')
const lineReader = require('readline')
const fs = require('fs')
const stream = require('stream');


class  GraphFileReader {


    constructor(fname) {
        this._fname = fname
        this._nodes = []
        this._edges = []
        this._nodes_map = new Map()
        this._mm = "test";
    }

    get getFile() {
        return this._fname
    }

    set setFile(fname) {
        this._fname = fname
    }


    readLines({ input }) {
        const output = new stream.PassThrough({ objectMode: true });
        const rl = readline.createInterface({ input });
        rl.on("line", line => { 
            output.write(line);
        });
        rl.on("close", () => {
            output.push(null);
        }); 
        return output;
    }

    readData() {
        var data = fs.readFileSync(this._fname, 'utf-8');
        var dds = data.split("\n")
        var node_no = 1
        var edges = []
        for(var i in dds) {
            var ar = dds[i].split('\t')
            var gene = ar[0].split("|")
            var proc = ar[1]
            if(this._nodes_map.has(gene[0]) == false) {
                let node = {id:node_no, label: gene[0], property:proc}
                this._nodes_map.set(gene[0], node)
                //this._nodes.push(gene[0])
                node_no += 1
            } 
            if(this._nodes_map.has(gene[1]) == false) {
                let node = {id:node_no, label: gene[0], property:proc}
                this._nodes_map.set(gene[1], node)
                //this._nodes.push(gene[1])
                node_no += 1
            }
            edges.push(gene)  
        }
        for ( let item of this._nodes_map) {
            log.info(">>>>>>>>> item : ", item)
            this._nodes.push(item[1])
        }

        for(let item of edges) {
            let ed1 = this._nodes_map.get(item[0])
            let ed2 = this._nodes_map.get(item[1])
            this._edges.push({from : ed1.id, to: ed2.id})
        }

    }

}

module.exports = GraphFileReader
