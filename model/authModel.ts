import mongoose from "mongoose";

interface iAuth {
    userName : string,
    email : string,
    password : string,
    image : string,
    imageID : string,
    todo : Array<{}>,
    progress : Array<{}>,
    done : Array<{}>
}

interface iAuthData extends iAuth, mongoose.Document{}

const authModel = new mongoose.Schema({
    userName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    image : {
        type : String
    },
    imageID : {
        type : String
    },
    todo : {
        type : [
            {
                type : mongoose.Types.ObjectId,
                refs : "todos"
            }
        ]
    },
    progress : {
        type : [
            {
                type : mongoose.Types.ObjectId,
                refs : "progress"
            }
        ]
    },
    done : {
        type : [
            {
                type : mongoose.Types.ObjectId,
                refs : "dones"
            }
        ]
    },
}, {timestamps : true})

export default mongoose.model<iAuthData>("auths", authModel)