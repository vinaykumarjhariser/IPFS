const express = require('express');
const bodyParser = require('body-parser');
const filelUpload = require('express-fileupload');
const { create } = require("ipfs-http-client");
const mongoose = require('mongoose');
const ipfsdetail = require('../model/db')
const fs = require("fs")
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(filelUpload());

async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https"
        }
    );
    return ipfs;
}
exports.index_get = (req,res)=>{
    res.sendFile(__dirname + '/index.html');
}

exports.ipfs_post = function(req,res){
    let fileName= req.body.fileName;
    let file = req.files.file;
    const filePath = 'files/'+fileName;

    async function saveFile() {

        let ipfs = await ipfsClient();
        file.mv(filePath,async(err)=>{
            if(err){
                console.log("error : failed to download the file");
                return res.status(500).send(err);
            }
            fs.unlink(filePath,(err)=>{
                if(err) console.log(err);
            })
            let data = fs.readFileSync(filePath)
            let result = await ipfs.add(data);
            console.log(result)
            const details = new ipfsdetail({
                fileName:fileName,
                hash:result.cid
            })
            details.save();
        })
    }
    saveFile();
    res.redirect('/')
}