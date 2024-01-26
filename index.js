import express from 'express';
import rootRoutes from './src/routes/rootRoutes.js';
import cors from 'cors';

const app = express();
const port = 8081

app.use(express.json())

app.use(express.static("."))

app.use(cors())

app.use(rootRoutes)

app.get('/', (req, res) => {
    res.send('capstone express ORM')

})
app.listen(port, () => {
    console.log(`BE is starting with port ${port}`)
})