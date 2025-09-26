import sequelize from "../config/database";
import './province.model';
import './district.model';
import './owner.model';
import './role.model';
import './product_type.model';
import './product.model';
import './position.model';
import './employee.model';
import './user.model';
import './income.model';
import './expense.model';
import "./currency.model";
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            alter: false,
            force: false,
        }); console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}