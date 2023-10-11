import mongoose from "mongoose";

interface iProgress {
    progresstask : string,
    userID : string
    auth : {}
}

interface iProgressData extends iProgress, mongoose.Document{}

const progressModel = new mongoose.Schema({
    progresstask : {
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

export default mongoose.model<iProgressData>("progress", progressModel)