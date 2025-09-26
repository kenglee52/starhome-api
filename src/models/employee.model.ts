import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { District } from "./district.model";
import { Position } from "./position.model";
export class Employee extends Model {
    public employeeID!: number;
    public employeeName!: string;
    public birth!: Date;
    public employeeTel!: string;
    public employeeVillage!: string;
    public cv!: string; 
    public districtID!: number;
    public salary!: number;
    public positionID!: number;
    public employeeGender!: string;
}

Employee.init({
    employeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    employeeTel: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    employeeVillage: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: true
    },
    districtID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: District,
            key: 'districtID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    positionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: Position,
          key: "positionID"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    employeeGender: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'employee',
    tableName: 'employee',
});
District.hasMany(Employee, {
    foreignKey: 'districtID',
});

Employee.belongsTo(District, {
    foreignKey: 'districtID',
});
Position.hasMany(Employee, {
         foreignKey: 'positionID'
});
Employee.belongsTo(Position, {
         foreignKey: 'positionID'
});

