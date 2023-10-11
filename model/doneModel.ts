import mongoose from "mongoose";

interface iDone {
    doneTask : string,
    userID : string
    auth : {}
}

interface iDoneData extends iDone, mongoose.Document{}

const doneModel = new mongoose.Schema({
    doneTask : {
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

export default mongoose.model<iDoneData>("dones", doneModel)