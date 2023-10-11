import { Request, Response } from "express"
import authModel from "../model/authModel"
import bcrypt from "bcrypt"

export const register = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userName, email, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await authModel.create({userName, email, password : hash}) 

        return res.status(201).json({
            message : "User Registered",
            data : user
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Registering",
            data : error
        })
    }
}

export const viewUsers = async(req : Request, res : Response): Promise<Response> =>{
    try {


        const user = await authModel.find() 

        return res.status(200).json({
            message : "Users Found",
            data : user
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding users",
            data : error
        })
    }
}

export const viewUser = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params

        const user = await authModel.findById(userID) 

        return res.status(200).json({
            message : "User Found",
            data : user
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding user",
            data : error
        })
    }
}

export const signIn = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {email, password} = req.body

        const user = await authModel.findOne({email}) 

        if(user){
            const check = await bcrypt.compare(password, user?.password)

            if (check) {
                return res.status(201).json({
                    message : `welcome back ${user?.userName}`,
                    data : user?._id
                })
            } else {
                return res.status(404).json({
                    message : "Incorrect Password"
                })
            }
        }else{
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Signing user",
            data : error
        })
    }
}

export const deleteUser = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params

        const user = await authModel.findByIdAndDelete(userID) 

        return res.status(200).json({
            message : `User...${user?.userName} Deleted`,
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Deleting user",
            data : error
        })
    }
}
