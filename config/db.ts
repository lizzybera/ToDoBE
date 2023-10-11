import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

// const URL : string = "mongodb://localhost:27017/todo"

const db = () =>{
    mongoose.connect(process.env.DB!).then(()=>{
        console.log("server is connected"); 
    })
}

export default db