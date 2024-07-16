import express from 'express';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import loginController from './controllers/loginController';
import roomsController from './controllers/roomsControlers';
import usersController from './controllers/usersControlers';

process.env.TOKEN_SECRET;

const app = express();
const port = 3000;

app.use(express.json());
app.use('/login', loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomsController);
app.use('/users', usersController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
