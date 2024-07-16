import express from 'express';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import loginController from './controllers/loginController';
import roomController from './controllers/roomControlers';

process.env.TOKEN_SECRET;

const app = express();
const port = 3000;

app.use(express.json());
app.use('/login', loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
