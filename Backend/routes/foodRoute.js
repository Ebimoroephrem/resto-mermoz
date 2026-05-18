import express from 'express';
import { addFood, foodList,deleteFood  } from '../controllers/foodControllers.js';
import multer from 'multer';

const foodRouter = express.Router();

// Configuration de multer pour le téléchargement d'images
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`);
    }
})
const upload = multer({ storage: storage });


foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', foodList);
foodRouter.post('/delete', deleteFood);


export default foodRouter;