import { Request, Response } from 'express';
class siteController {
    static getHomePage(req: Request, res: Response): void {
        return res.render('index', {
            title: 'Home Page',
        });
    }
}

export default siteController;
