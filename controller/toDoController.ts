import { Request, Response } from "express"
import authModel from "../model/authModel"
import toDoModel from "../model/toDoModel"
import mongoose from "mongoose"

export const createToDo = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params
        const {task} = req.body

        const user = await authModel.findById(userID)

        if(user){

            const todo = await toDoModel.create({task, userID})

            user?.todo.push(new mongoose.Types.ObjectId(todo._id))
            user?.save()

            return res.status(201).json({
                message : "todo created",
                data : todo
            })

        }else{
            return res.status(404).json({
                message : "User Cannot be Found"
            }) 
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error creating Todo",
            data : error
        })
    }
}

export const viewTodos = async(req : Request, res : Response): Promise<Response> =>{
    try {

        const user = await toDoModel.find() 

        return res.status(200).json({
            message : "todos Found",
            data : user
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding todos",
            data : error
        })
    }
}

export const viewUserTodo = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID} = req.params

        const user = await authModel.findById(userID).populate({
            path : "todo",
            options : {
                sort : {
                    createdAt :  -1
                }
            }
        }) 

        return res.status(200).json({
            message : "User todos Found",
            data : user?.todo
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error Finding user todos",
            data : error
        })
    }
}

export const deleteTodo = async(req : Request, res : Response): Promise<Response> =>{
    try {
        const {userID, todoID} = req.params

        const user = await authModel.findById(userID) 

        if(user){

        const todoUser = await toDoModel.findById(todoID)
            
            if (todoUser?.userID == userID) {
                const todo = await toDoModel.findByIdAndDelete(todoID)
    
                return res.status(201).json({
                    message : "todo deleted",
                    data : todo
                })
            } else {
                return res.status(404).json({
                    message : "Cant delete another persons task"
                })
            }
        }else{
            return res.status(404).json({
                message : "Error finding user"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message : "Error Deleting todo",
            data : error
        })
    }
}
