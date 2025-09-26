import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class ProductType extends Model{
   public productTypeID!: number;
   public productTypeName!: string;
}
ProductType.init({
   productTypeID:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
   },
   productTypeName:{
         type: DataTypes.STRING(50),
         allowNull: false,
         unique: true
   }
},
{
   sequelize,
   modelName: 'producttype',
   tableName: 'producttype'
})