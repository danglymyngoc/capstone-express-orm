import { createToken } from "../config/jwt.js"

import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const signIn = async (req, res) => {
    try {
        let { email, password } = req.body
        let data = await prisma.users.findFirst({
            where: {
                email: email,
            }
        })
        if (data) {
            let checkPassword = bcrypt.compareSync(password, data.password)
            if (checkPassword) {
                let payload = {
                    email: data.email,
                    full_name: data.full_name,
                    user_id: data.user_id,
                }
                let token = createToken(payload)
                res.status(200).send(token)
            } else {
                res.status(400).send('password incorrect')
            }
        } else {
            res.status(404).send('login failed')
        }
    } catch (error) {
        res.send(error)
    }

}

const signUp = async (req, res) => {
    try {
        let { full_name, email, password, age } = req.body
        //kiem tra user da ton tai trong DB hay chua
        let data = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if (data) {
            res.status(400).send('user is existed')
        } else {
            let encodePassword = bcrypt.hashSync(password, 10)
            let newUser = {
                full_name,
                email,
                password: encodePassword,
                age,
                avatar: "https://i.pravatar.cc/300"
            }
            await prisma.users.create({
                data: newUser
            })
            res.status(201).send({
                full_name,
                email,
                age
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}



export {
    signIn,
    signUp
}