const express = require('express');
const bodyParser = require('body-parser');
const filelUpload = require('express-fileupload');
const { create } = require("ipfs-http-client");
const mongoose = require('mongoose');
const ipfsdetail = require('./model/db')
const fs = require("fs")
const path = require('path');
const app = express();
const controller = require('./controller/controller')
app.use(bodyParser.urlencoded({extended:true}));
app.use(filelUpload());


app.use(express.static('public'))
app.get('/',controller.index_get);

app.post('/',controller.ipfs_post);

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
