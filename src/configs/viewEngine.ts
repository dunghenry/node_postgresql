import express, { Express } from 'express';
import { engine } from 'express-handlebars';
const viewEngine = (app: Express): void => {
    app.use(express.static('./src/public'));
    app.engine('.hbs', engine({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', './src/views');
};

export default viewEngine;
