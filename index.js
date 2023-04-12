import express from 'express'
import multer from 'multer';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'

import { postCreateValidation, registerValidation, loginValidation } from './validations/validations.js'
import checkAuth from './utils/checkAuth.js'
import * as UserContoller from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';
const app = express();
app.use(cors())
dotenv.config();


const PORT = process.env.PORT

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})
app.post('/upload',checkAuth, upload.single('image'),(req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})


app.use('/uploads', express.static('uploads'))



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://admin:18bybik24@cluster0.5cg1snu.mongodb.net/blog?retryWrites=true&w=majority').then(() => console.log('db ok'))
.catch((err) => console.log(`db error ${err}`))

app.post('/auth/login',loginValidation,handleValidationErrors ,UserContoller.login )

app.post('/auth/register',registerValidation,handleValidationErrors, UserContoller.register)

app.get('/auth/me', checkAuth, UserContoller.getMe)

app.post('/posts',checkAuth, postCreateValidation, handleValidationErrors,PostController.create)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)

app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth ,postCreateValidation,handleValidationErrors,PostController.update)






app.listen(PORT, () => {
    console.log('Server is running...')
})