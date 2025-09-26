import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Owner } from "./owner.model";
import { District } from "./district.model";
import { ProductType } from "./product_type.model";
import { Currency } from "./currency.model";
export class Product extends Model {
   public productID!: string;
   public productName!: string;
   public ownerID!: number;
   public productTypeID!: number;
   public village!: string;
   public districtID!: number;
   public status!: string;
   public size!: string;
   public price!: number;
   public image!: string[]; // JSON string array
   public video!: string[]; // JSON string array
   public tel!: string;
   public description!: string;
   public currencyID!: number;
}
Product.init({
   productID: {
      type: DataTypes.STRING(15),
      primaryKey: true
   },
   productName: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   ownerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Owner,
         key: 'ownerID'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
   },
   productTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: ProductType,
         key: "productTypeID"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
   },
   village: {
      type: DataTypes.STRING(50),
      allowNull: false
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
   status: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   size: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   price: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   image: {
      type: DataTypes.TEXT, // JSON string array
      allowNull: true
   },
   video: {
      type: DataTypes.TEXT, // JSON string array
      allowNull: true
   },
   tel: {
      type: DataTypes.STRING(11),
      allowNull: false
   },
   description: {
      type: DataTypes.TEXT,
   },
   currencyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Currency,
         key: "currencyID"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
   }
}, {
   sequelize,
   modelName: 'product',
   tableName: 'product'
});
Owner.hasMany(Product, {
   foreignKey: 'ownerID',
});
Product.belongsTo(Owner, {
   foreignKey: 'ownerID'
});
District.hasMany(Product, {
   foreignKey: 'districtID'
});
Product.belongsTo(District, {
   foreignKey: 'districtID'
});
ProductType.hasMany(Product, {
   foreignKey: 'productTypeID'
});
Product.belongsTo(ProductType, {
   foreignKey: 'productTypeID'
});
Currency.hasMany(Product, {
    foreignKey: "currencyID" 
   });
Product.belongsTo(Currency, { 
   foreignKey: "currencyID" 
});
