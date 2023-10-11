import mongoose from "mongoose";

interface iTodo {
    task : string,
    userID : string
    auth : {}
}

interface iTodoData extends iTodo, mongoose.Document{}

const todoModel = new mongoose.Schema({
    task : {
        type : String
    },
    userID : {
        type : String
    },
    auth : {
        type : mongoose.Types.ObjectId,
        refs : "auths"
    }
}, {timestamps : true})

export default mongoose.model<iTodoData>("todos", todoModel)