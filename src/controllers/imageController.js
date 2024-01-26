import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getListImg = async (req, res) => {
    let { page, size } = req.params
    let num_page = Number(page)
    let num_size = Number(size)
    let index = (num_page - 1) * num_size
    try {
        let data = await prisma.images.findMany({
            skip: index,
            take: num_size
        })
        res.send(data)


    } catch (error) {
        res.send(error)
    }
}

const getImgByName = async (req, res) => {
    let { img_name } = req.query
    try {

        let data = await prisma.images.findMany({
            where: {
                img_name: {
                    //filter theo videoName
                    contains: img_name
                }
            },

        })
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send('not found')
        }

    } catch (error) {
        res.send(error)
    }
}

const getDetailImg = async (req, res) => {
    let { imgId } = req.params
    try {

        let data = await prisma.images.findFirst({
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
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send('not found')
        }
    } catch (error) {
        res.send(error)
    }

}


export {
    getListImg,
    getImgByName,
    getDetailImg,
}