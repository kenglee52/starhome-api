import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

export class Currency extends Model{
    public currencyID!: number;
    public currencyName!: string;
}

Currency.init({
    currencyID: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
    },
    currencyName: {
         type: DataTypes.STRING(30),
         allowNull: false,
         unique: false
    }
},{
         sequelize,
         modelName: "currency",
         tableName: "currency"
})