import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.get('/', (request, response) =>
  response.json({ appointments }),
);

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    provider,
    date,
    id: uuid(),
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
