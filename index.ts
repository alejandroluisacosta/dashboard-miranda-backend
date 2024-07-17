import express from 'express';
import path from 'path';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import loginController from './controllers/loginController';
import roomsController from './controllers/roomsControllers';
import usersController from './controllers/usersControllers';
import commentController from './controllers/commentControllers';
import mustacheExpress from 'mustache-express'

process.env.TOKEN_SECRET;

export const app = express();
export const port = 3000;

// PUBLIC ROUTE
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.get('/public', (_req, res) => {
    res.render('index');
  })

app.use(express.json());
app.use('/login', loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomsController);
app.use('/users', usersController);
app.use('/comments', commentController);


// module.exports = { app };