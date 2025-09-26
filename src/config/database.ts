import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,  
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 3306, // เพิ่ม port จาก .env หรือใช้ default 3306
    dialect: process.env.DB_DIALECT! as any,
    dialectOptions: {
      connectTimeout: 20000, // เพิ่ม timeout 20 วินาที
    },
    logging: console.log, // แสดง SQL queries
  }
);

export default sequelize;
