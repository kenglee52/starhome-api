import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

export class Expense extends Model{
   public expenseID!: number;
   public expenseAmount!: number;
   public expenseReason!: string;
}
Expense.init({
   expenseID:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
   },
   expenseAmount:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   expenseReason:{
         type: DataTypes.STRING(100),
   },
},
{
sequelize,
tableName: 'expense',
modelName: 'expense'
})