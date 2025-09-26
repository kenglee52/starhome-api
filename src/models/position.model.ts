import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class Position extends Model{
   public positionID!: number;
   public positionName!: string;
}
Position.init({
   positionID:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
   },
   positionName:{
         type: DataTypes.STRING(50),
         unique: true,
         allowNull: false,
   }
},
{
         sequelize,
         modelName: 'position',
         tableName: 'position'
})