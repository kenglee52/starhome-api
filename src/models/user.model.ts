import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Employee } from "./employee.model";
import { Role } from "./role.model";
export class User extends Model {
    public userID!: number;
    public roleID!: number;
    public employeeID!: number;
    public password!: string;
}
User.init({
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'roleID'

        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'employeeID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
});
Employee.hasMany(User, {
    foreignKey: 'employeeID'
});
User.belongsTo(Employee, {
    foreignKey: 'employeeID'
});
Role.hasMany(User, {
    foreignKey: 'roleID'
});
User.belongsTo(Role, {
    foreignKey: 'roleID',
});
