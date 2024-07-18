import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import loginController from './controllers/loginController';
import roomsController from './controllers/roomsControllers';
import usersController from './controllers/usersControllers';
import commentController from './controllers/commentControllers';
import mustacheExpress from 'mustache-express'
import { authenticateToken } from './middleware/auth';

process.env.TOKEN_SECRET;

export const app = express();
export const port = 3000;
app.use(express.json());

// PUBLIC ROUTE
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.get('/public', (_req, res) => {
    res.render('index');
  })

app.use('/login', loginController);
  
app.use(authenticateToken);
app.use('/bookings', bookingController);
app.use('/rooms', roomsController);
app.use('/users', usersController);
app.use('/comments', commentController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected error occurred' });
});

