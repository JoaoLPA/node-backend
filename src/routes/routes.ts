import { Router } from 'express';

const routes = Router();

routes.get('/debug', (request, response) =>
  response.json({ message: 'Hello routes!' })
);

export default routes;
