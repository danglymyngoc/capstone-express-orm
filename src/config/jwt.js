import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const createToken = (data) => {
    return jwt.sign(
        { data },
        'NODE38',
        { expiresIn: "1y" }
    )
}

const checkToken = (token) => {
    return jwt.verify(token, "NODE38", (err, decodedToken) => {
        if (err) {
            return {
                statusCode: 401,
                message: "Invalid token"
            }
        } else {

            return {
                statusCode: 200,
                data: decodedToken
            }
        }
    })
}

const verifyToken = async (req, res, next) => {

    let { token } = req.headers;
    if (!token) {
        res.status(401).send("Token is invalid")
        return
    }

    let isValidToken = checkToken(token);
    if (isValidToken.statusCode == 401) {
        res.staus(401).send(isValidToken.message);
        return
    }

    let { user_id } = isValidToken.data.data;
    let data = await prisma.users.findFirst({
        where: {
            user_id: user_id
        }
    })
    if (!data) {
        res.status(401).send("Invalid token");
        return
    }
    next();
}


export {
    createToken,
    checkToken,
    verifyToken
}