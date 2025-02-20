import { PrismaClient } from "@prisma/client";


import express from "express";
import {z} from "zod"
import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import { log } from "console";

const prisma = new PrismaClient ();

export const signupUser = async(req : express.Request, res: express.Response)  => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        
        const user = await prisma.user.findUnique({where : {email}}) 
        if(!user) {
            const salt = await bcrypt.genSalt(10);
            const hashpwd = await bcrypt.hash(password, salt);
            await prisma.user.create({
                data:{
                    email,
                    password: hashpwd,
                },
            })
           
            
            
            res.status(200).json({
                message:"Veuillez confirmez votre inscription dans votre boite mail",
                status:200,
                user:user
            })
            return;
        }
            
         else { 
            res.status(400).json({message:"Email déjà utilisé"})
        }


    } catch (error) {
        console.error(error)
        if (error instanceof Error) {
            res.status(400).json({message: "erreur serveur",error: error.message})
        }
        
        
        
    }
}