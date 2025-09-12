import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

export function getSequelize() {
    if (!sequelize) {
        sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.HOST,
            port: process.env.DB_PORT || 3306,
            dialect: "mysql",
            logging: false,
        }
        );
    }
    return sequelize;
}

/*
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});

try {
    await sequelize.authenticate();
    console.log('DB connected');
} catch (err) {
    console.error('DB connection error:', err);
}

export default sequelize;
*/