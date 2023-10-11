import cors from "cors";
import express, { Application, Request, Response } from "express";
import auth from './router/authRouter'
import todo from './router/todoRouter'
import done from './router/doneRouter'
import progress from './router/progressRouter'

export const mainApp = (app : Application) =>{
    app.use(express.json())
    app.use(cors(
    //     {
        // origin : "*",
        
    // }
    ))

    app.use("/api", auth)
    app.use("/api", todo)
    app.use("/api", done)
    app.use("/api", progress)

    app.get("/", (req : Request, res : Response)=>{
        try {
            return res.status(200).json({
                message : 'welcome'
            })
        } catch (error) {
            return res.status(404).json({
                message : 'Error'
            })
        }
    })
}