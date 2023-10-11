import { Request, Response } from "express"
import authModel from "../model/authModel"
import mongoose from "mongoose"
import progressModel from "../model/progressModel"

export const createProgress = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params
        const {progressTask} = req.body

        const user = await authModel.findById(userID)

        if(user){

            const progress = await progressModel.create({progressTask, userID})

            user?.progress.push(new mongoose.Types.ObjectId(progress._id))
            user?.save()

            return res.status(201).json({
                message : "progress created",
                data : progress
            })

        }else{
            return res.status(404).json({
                message : "User Cannot be Found"
            }) 
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error creating progress",
            data : error
        })
    }
}

export const viewprogresss = async(req : Request, res : Response): Promise<Response> =>{
    try {

        const progress = await progressModel.find() 

        return res.status(200).json({
            message : "progresss Found",
            data : progress
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding progresss",
            data : error
        })
    }
}

export const viewUserprogress = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params

        const user = await authModel.findById(userID).populate({
            path : "progress",
            options : {
                sort : {
                    createdAt :  -1
                }
            }
        }) 

        return res.status(200).json({
            message : "User progresss Found",
            data : user?.progress
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding user progresss",
            data : error
        })
    }
}

export const deleteprogress = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID, progressID} = req.params

        const user = await authModel.findById(userID) 

        if(user){

        const progressUser = await progressModel.findById(progressID)
            
            if (progressUser?.userID === userID) {
                const progress = await progressModel.findByIdAndDelete(progressID)
    
                return res.status(201).json({
                    message : "progress deleted",
                    data : progress
                })
            } else {
                return res.status(404).json({
                    message : "Cant delete another persons progressTask"
                })
            }
        }else{
            return res.status(404).json({
                message : "Error finding user"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error Deleting progress",
            data : error
        })
    }
}
