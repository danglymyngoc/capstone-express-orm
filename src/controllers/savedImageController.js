import { PrismaClient } from '@prisma/client'
import { checkToken } from '../config/jwt.js'
const prisma = new PrismaClient()

const getSavedImage = async (req, res) => {
    try {
        const { imgId } = req.params
        const { token } = req.headers
        const isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;
        const checkImgNotFound = await prisma.images.findFirst({
            where: {
                img_id: +imgId
            }
        })
        if (!checkImgNotFound) {
            return res.status(404).send('Image not found')
        }
        const checkSaved = await prisma.save_images.findMany({
            where: {
                user_id,
                img_id: +imgId
            }
        })

        if (checkSaved.length == 0) {
            return res.status(200).send('This image has not been saved')
        }
        return res.status(404).send('This image has been saved')

    } catch (error) {
        res.send(error)
    }

}

const getSavedImageList = async (req, res) => {
    try {
        const { token } = req.headers
        const isValidToken = checkToken(token)
        const { user_id } = isValidToken.data.data;
        const data = await prisma.save_images.findMany({
            where: {
                user_id
            },
            include: {
                images: {
                    select: {
                        img_name: true,
                        img_url: true,
                        img_desc: true
                    }
                }
            }
        })
        if (data) {
            res.status(200).send(data)
        }
        res.send('No images saved')
    } catch (error) {
        res.send(error)
    }

}

export {
    getSavedImage,
    getSavedImageList
}