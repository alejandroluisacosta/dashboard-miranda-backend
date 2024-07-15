import express from 'express';
import { router } from './controllers';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/app', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
