import { Router } from 'express';
import siteController from '../controllers/site.controller';
const router = Router();
router.get('/', siteController.getHomePage);

export default router;
