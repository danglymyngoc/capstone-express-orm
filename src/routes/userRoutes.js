import express from 'express';
import storage from '../controllers/uploadController.js';
import { addSingleImg, deleteImage, getListCreatedImg, getUserInfo, postComment, saveImage, updateUserInfo } from '../controllers/userController.js';
import { verifyToken } from '../config/jwt.js';


const userRoutes = express.Router()

userRoutes.post('/add-single-img', verifyToken, storage.single('file'), addSingleImg)

userRoutes.put('/update-user-info', verifyToken, storage.single('file'), updateUserInfo)

userRoutes.get('/get-user-info', verifyToken, getUserInfo)

userRoutes.get('/get-list-created-img-by-userId', verifyToken, getListCreatedImg)

userRoutes.delete('/delete-created-img-by-imgId/:imgId', verifyToken, deleteImage)

userRoutes.post('/post-comment/:imgId', verifyToken, postComment)

userRoutes.post('/save-image/:imgId', verifyToken, saveImage)
export default userRoutes

