import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
export default sequelize;
