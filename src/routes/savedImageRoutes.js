import express from 'express';
import { getSavedImage, getSavedImageList } from '../controllers/savedImageController.js';
import { verifyToken } from '../config/jwt.js';

const savedImageRoutes = express.Router()

savedImageRoutes.get('/get-saved-img-by-imgId/:imgId', verifyToken, getSavedImage)

savedImageRoutes.get('/get-list-saved-img-by-userId', verifyToken, getSavedImageList)

export default savedImageRoutes