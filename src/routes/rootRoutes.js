import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import imageRoutes from './imageRoutes.js';
import commentRoutes from './commentRoutes.js';
import savedImageRoutes from './savedImageRoutes.js';

const rootRoutes = express.Router()

rootRoutes.use('/user', userRoutes)
rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/img', imageRoutes)
rootRoutes.use('/comment', commentRoutes)
rootRoutes.use('/savedImage', savedImageRoutes)

export default rootRoutes