import { Express } from 'express';
import auth from './auth.route';
import site from './site.route';
const routes = (app: Express): void => {
    app.use('/', site);
    app.use('/api/v1/auth', auth);
};

export default routes;
