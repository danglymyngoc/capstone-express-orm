import express from 'express';
import storage from '../controllers/uploadController.js';
import { addSingleImg, deleteImage, getListCreatedImg, getUserInfo, postComment, saveImage, updateUserInfo, uploadAvatar, uploadImg } from '../controllers/userController.js';
import { verifyToken } from '../config/jwt.js';


const userRoutes = express.Router()


userRoutes.post(
    "/upload-avatar",
    verifyToken,
    storage.single("file"),
    uploadAvatar
)

userRoutes.post(
    '/upload-img',
    verifyToken,
    storage.single("file"),
    uploadImg,

)

userRoutes.post('/add-single-img', verifyToken, addSingleImg)

userRoutes.put('/update-user-info', verifyToken, updateUserInfo)

userRoutes.get('/get-user-info', verifyToken, getUserInfo)

userRoutes.get('/get-list-created-img-by-userId', verifyToken, getListCreatedImg)

userRoutes.delete('/delete-created-img-by-imgId/:imgId', verifyToken, deleteImage)

userRoutes.post('/post-comment/:imgId', verifyToken, postComment)

userRoutes.post('/save-image/:imgId', verifyToken, saveImage)
export default userRoutes

