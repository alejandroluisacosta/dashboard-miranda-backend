import express from 'express';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';

process.env.SECRET_TOKEN;

const app = express();
const port = 3000;

app.use(express.json());
app.use('/bookings', bookingController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
