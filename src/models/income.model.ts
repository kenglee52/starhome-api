import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

export class Income extends Model{
   public incomeID!: number;
   public incomeAmount!: number;
   public incomeReason!: string;
}
Income.init({
   incomeID:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
   },
   incomeAmount:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   incomeReason:{
         type: DataTypes.STRING(100),
   },
},
{
sequelize,
tableName: 'income',
modelName: 'income'
})