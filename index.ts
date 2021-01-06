import express, { Request, Response }  from 'express';
import './env';
import bodyParser from 'body-parser';
import { connectMongo } from './db';
import users from './routes/users';
import offers from './routes/offers';
import { connectionPortSecret } from "./helpers/secrets"

connectMongo();

const app = express();
app.use(bodyParser.json());

app.use('/users', users);
app.use('/offers', offers);

app.get('/', (req: Request, res: Response) => {
    res.send('OK');
});

const port = connectionPortSecret || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
