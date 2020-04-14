import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointment', appointmentsRouter);

routes.get('/debug', (request, response) =>
  response.json({ message: 'Hello routes!' }),
);

export default routes;
