const mongoose = require('mongoose');

const connection = ()=>{
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(MONGO_URI).then(()=>{

        console.log(`Database Connected`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connection;