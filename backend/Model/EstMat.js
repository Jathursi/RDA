import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
// import Supplier from "./Supplier.js";

const EstMat = sequelize.define(
    "EstMat",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Material: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Mat_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        MatQ: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        supID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'supplier',
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        tableName: "estmat",
        timestamps: false,
    }
);

export default EstMat;
