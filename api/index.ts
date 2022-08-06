import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import absenceRouter from './routes/absences';
import memberRouter from './routes/members';
import computed from './routes/computedRoutes';
import computed from './routes/computedRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*'
}));
app.use(express.json({ 'extended': false } as bodyParser.OptionsJson));

app.use('/api/absences/', absenceRouter);
app.use('/api/members/', memberRouter);
app.use('/api/computed/', computed);

app.get('*', (req: Request, res: Response) => {
  res.status(406).send('Please be specific with the endpoint');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});