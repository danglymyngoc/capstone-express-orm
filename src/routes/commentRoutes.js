import express from 'express';
import { getListComment } from '../controllers/commentController.js';

const commentRoutes = express.Router()

commentRoutes.get('/get-comment-by-imgId/:imgId', getListComment)

export default commentRoutes