import express, { Express } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import sequelize from './configs/connect.db';
import viewEngine from './configs/viewEngine';
import { MongoDB } from 'winston-mongodb';
import routes from './routes';
require('winston-mongodb').MongoDB;
import connectLogs from './configs/connect.log';
import { logger, myFormat } from './helpers/logger';
dotenv.config();
const port: Number = +process.env.PORT || 4000;
const app: Express = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
//connect db
(async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log(
            colors.green('Connection has been established successfully.'),
        );
        await sequelize.sync({ force: true });
        console.log(colors.green('All models were synchronized successfully.'));
    } catch (error) {
        console.error(colors.red('Unable to connect to the database:'), error);
    }
})();
//connect db logs
connectLogs();
//set view engine, views, static file
viewEngine(app);
//config routes
routes(app);
app.use(
    expressWinston.logger({
        transports: [
            new winston.transports.MongoDB({
                db: process.env.MONGODB_URI,
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                },
                collection: 'logs',
            }),
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.metadata(),
            winston.format.prettyPrint(),
        ),
        winstonInstance: logger, // log file
        statusLevels: true, // log to db
    }),
);
app.use(
    expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                filename: 'src/logs/logsInternalErrors.log',
            }),
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.metadata(),
            winston.format.prettyPrint(),
            myFormat,
        ),
    }),
);
app.listen(port, () => {
    console.log(colors.green(`Server listening on http://localhost:${port}`));
});
