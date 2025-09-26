
import sequelize from "../config/database";
import { Model, DataTypes } from "sequelize";
import { Province } from "./province.model";
export class District extends Model {
         public districtID!: number;
         public districtName!: string;
         public provinceID!: number;
}
District.init({
         districtID: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
         },
         districtName: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
         },
         provinceID: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: {
                           model: Province,
                           key: 'provinceID'
                  },
                  onDelete: 'CASCADE',
                  onUpdate: 'CASCADE'
         },
}, {
         sequelize,
         modelName: 'district',
         tableName: 'district'
});

Province.hasMany(District, {
         foreignKey: 'provinceID',
});
District.belongsTo(Province, {
         foreignKey: 'provinceID',
});


