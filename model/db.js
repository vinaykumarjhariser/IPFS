const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ipfs', {

    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(function () {
    console.log("Connection connected Successfully");
}).catch(function () {
    console.log("Connection Fail");
})
const ipfsSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    hash: {
        type: String,
        required:true
    }
});

let  ipfsdetail  =  mongoose.model("ipfsdetail", ipfsSchema);
module.exports  = ipfsdetail;