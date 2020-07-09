process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

import express, { json } from 'express';
import { loadControllers } from 'awilix-express';
import container from './container';

// Create a new express app instance
const app: express.Application = express();

app.use(json());

// Load dependencies
container(app);

// Load controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname })
);

export { app };