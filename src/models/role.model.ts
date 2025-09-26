import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
export class Role extends Model{
   public roleID!: number;
   public roleStatus!: string;
}
Role.init({
   roleID:{
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
   },
   roleStatus:{
         type: DataTypes.STRING(50),
         unique: true,
         allowNull: false
   }
},{
      sequelize,
      modelName: 'role',
      tableName: 'role'
});