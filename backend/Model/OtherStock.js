import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const OtherStock = sequelize.define("OtherStock", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Stock: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stock_cost: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    StockQ: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stock_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stock_Sup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stock_Auth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "othermaterials",
            key: "id",
        },
    },
}, {
    tableName: "otherstocks",
    timestamps: false,
});

export default OtherStock;