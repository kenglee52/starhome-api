import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
export class Province extends Model {
    public provinceID!: number;
    public provinceName!: string;
}

Province.init({
    provinceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    provinceName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }

}, {
    sequelize,
    modelName: 'province',
    tableName: 'province'
})