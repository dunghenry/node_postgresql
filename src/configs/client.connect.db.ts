import { Client } from 'pg';
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();
export const client = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'DB',
    password: 'postgres',
    port: 5432,
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log(colors.green('Connect database sucessfully'));
    } catch (error) {
        console.log(colors.red('Connect database failed'));
        console.log(error);
        process.exit(1);
    }
};
process.on('SIGINT', async () => {
    console.log(colors.red('You are performing a server shutdown database!'));
    await client.end();
    process.exit(0);
});
export default connectDB;
