import { checkToken } from "../config/jwt.js";
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const addSingleImg = async (req, res) => {
    try {
        let { token } = req.headers;
        let isValidToken = checkToken(token);
        let { user_id } = isValidToken.data.data;
        let { imgInfo } = req.body
        let img_url = `http://localhost:8081/public/img/${req.file.filename}`
        let img_name = JSON.parse(imgInfo).img_name
        let img_desc = JSON.parse(imgInfo).img_desc

        let newImg = {
            img_name,
            img_url,
            img_desc,
            user_id
        }

        await prisma.images.create({
            data: newImg
        })

        res.send('add image successful')

    } catch (error) {
        res.send(error)
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const { token } = req.headers
        let isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;
        const checkUserId = await prisma.users.findFirst({
            where: {
                user_id: +user_id
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        const { userInfo } = req.body
        const avatar = `http://localhost:8081/public/img/${req.file.filename}`
        const { full_name, email, password, age } = JSON.parse(userInfo)

        const checkEmail = await prisma.users.findMany({
            where: {
                email
            }
        })
        if (checkEmail.length > 0) {
            return res.send('Email already exists')
        }

        let encodePassword = bcrypt.hashSync(password, 10)

        let updateData = {
            full_name,
            email,
            password: encodePassword,
            avatar,
            age
        }
        await prisma.users.update({
            where: {
                user_id: +user_id
            },
            data: updateData
        })
        res.send('Update user info successful')
    } catch (error) {
        res.send(error)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { token } = req.headers
        let isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;
        const checkUserId = await prisma.users.findFirst({
            where: {
                user_id: +user_id
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        let data = await prisma.users.findFirst({
            where: {
                user_id: +user_id
            },
            select: {
                full_name: true,
                email: true,
                age: true,
                avatar: true
            }

        })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const getListCreatedImg = async (req, res) => {

    try {
        const { token } = req.headers
        const isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;


        let data = await prisma.images.findMany({
            where: {
                user_id
            },
        })
        if (data.length > 0) {
            return res.status(200).send(data)
        }
        return res.send('No images created')

    } catch (error) {
        res.send(error)
    }

}

const deleteImage = async (req, res) => {
    try {
        const { token } = req.headers
        let isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;
        const checkUserId = await prisma.users.findFirst({
            where: {
                user_id: +user_id
            }
        })
        let { imgId } = req.params
        const checkRole = await prisma.images.findFirst({
            where: {
                img_id: +imgId
            }
        })
        if (checkUserId.user_id != checkRole.user_id) {
            return res.send('You do not have the right to delete the image')
        }

        await prisma.images.delete({
            where: {
                img_id: +imgId
            }
        })
        res.send('Delete image successful')
    } catch (error) {
        res.send(error)
    }
}

const postComment = async (req, res) => {
    try {
        const { token } = req.headers
        const isValidToken = checkToken(token)

        const { user_id } = isValidToken.data.data;

        const { imgId } = req.params

        const { cmt_date, cmt_content } = req.body

        const checkImgId = await prisma.images.findFirst({
            where: {
                img_id: Number(imgId)
            }
        })
        if (!checkImgId) {
            return res.status(404).send('Image not found')
        }
        let newComment = {
            user_id: user_id,
            img_id: +imgId,
            cmt_date,
            cmt_content
        }
        console.log(newComment)
        await prisma.comments.create({
            data: newComment
        })
        return res.status(200).send('add comment successful')
    } catch (error) {
        res.send(error)
    }
}

const saveImage = async (req, res) => {
    try {
        const { token } = req.headers
        const isValidToken = checkToken(token)

        const { user_id } = isValidToken.data.data;

        const { imgId } = req.params

        const { save_date } = req.body

        const checkImgNotFound = await prisma.images.findFirst({
            where: {
                img_id: +imgId
            }
        })
        if (!checkImgNotFound) {
            return res.status(404).send('Image not found')
        }
        const checkUserId = await prisma.save_images.findMany({
            where: {
                user_id
            }
        })
        const checkImgId = await prisma.save_images.findMany({
            where: {
                img_id: +imgId
            }
        })
        if (checkImgId.length >= 1 && checkUserId.length >= 1) {
            return res.send('The image already exists in the list of saved images')
        } else {
            let newSave = {
                user_id: +user_id,
                img_id: +imgId,
                save_date,
            }

            await prisma.save_images.create({
                data: newSave
            })
            return res.status(200).send('save successful')
        }

    } catch (error) {
        res.send(error)
    }
}

export {
    addSingleImg,
    updateUserInfo,
    getUserInfo,
    getListCreatedImg,
    deleteImage,
    postComment,
    saveImage
}