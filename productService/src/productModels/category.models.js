const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
},{
    timestamps: true
})