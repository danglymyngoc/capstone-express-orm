import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getListComment = async (req, res) => {
    try {
        const { imgId } = req.params
        const checkImgId = await prisma.images.findFirst({
            where: {
                img_id: +imgId
            },

        })
        if (!checkImgId) {
            return res.status(404).send('image not found')
        }
        const data = await prisma.comments.findMany({
            where: {
                img_id: +imgId
            },
            include: {
                users: {
                    select: {
                        full_name: true,
                        email: true
                    }
                }
            }
        })
        if (data.length > 0) {
            return res.status(200).send(data)
        }
        return res.send('no comment')
    } catch (error) {
        res.send(error)
    }
}

export {
    getListComment
}