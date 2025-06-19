import express from 'express';
import usersRoutes from './routes/users.routes.js';
const app = express();

//middlewares
app.use(express.json());

//routes
app.use('/api',usersRoutes);

export default app;