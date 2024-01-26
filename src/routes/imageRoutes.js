import express from 'express';

import { getDetailImg, getImgByName, getListImg } from '../controllers/imageController.js';

const imageRoutes = express.Router()

imageRoutes.get('/get-list-img/:page/:size', getListImg)
imageRoutes.get('/get-img-by-name', getImgByName)
imageRoutes.get('/get-detail-img/:imgId', getDetailImg)


export default imageRoutes