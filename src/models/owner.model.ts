import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
export class Owner extends Model {
         public ownerID!: number;
         public ownerName!: string;
         public ownerGender!: string;
         public ownerTel!: string;
}

Owner.init({
         ownerID: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
         },
         ownerName: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
         },
         ownerGender: {
                  type: DataTypes.STRING(15),
                  allowNull: false
         },
         ownerTel: {
                  type: DataTypes.STRING(11),
                  allowNull: false
         }
}, {
         sequelize,
         modelName: 'owner',
         tableName: 'owner'
})