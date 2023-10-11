import { Request, Response } from "express"
import authModel from "../model/authModel"
import mongoose from "mongoose"
import doneModel from "../model/doneModel"

export const createDone = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params
        const {doneTask} = req.body

        const user = await authModel.findById(userID)

        if(user){

            const done = await doneModel.create({doneTask, userID})

            user?.done.push(new mongoose.Types.ObjectId(done._id))
            user?.save()

            return res.status(201).json({
                message : "done created",
                data : done
            })

        }else{
            return res.status(404).json({
                message : "User Cannot be Found"
            }) 
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error creating done",
            data : error
        })
    }
}

export const viewDones = async(req : Request, res : Response): Promise<Response> =>{
    try {

        const done = await doneModel.find() 

        return res.status(200).json({
            message : "dones Found",
            data : done
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding dones",
            data : error
        })
    }
}

export const viewUserdone = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params

        const user = await authModel.findById(userID).populate({
            path : "done",
            options : {
                sort : {
                    createdAt :  -1
                }
            }
        }) 

        return res.status(200).json({
            message : "User dones Found",
            data : user?.done
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding user dones",
            data : error
        })
    }
}

export const deletedone = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID, doneID} = req.params

        const user = await authModel.findById(userID) 

        if(user){

        const doneUser = await doneModel.findById(doneID)
            
            if (doneUser?.userID === userID) {
                const done = await doneModel.findByIdAndDelete(doneID)
    
                return res.status(201).json({
                    message : "done deleted",
                    data : done
                })
            } else {
                return res.status(404).json({
                    message : "Cant delete another persons doneTask"
                })
            }
        }else{
            return res.status(404).json({
                message : "Error finding user"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error Deleting done",
            data : error
        })
    }
}
