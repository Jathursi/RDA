import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Out = sequelize.define("Out", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Date: {
        type: DataTypes.STRING, // Consider changing this to DataTypes.DATE if you're using actual date types
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Job_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT, // Change to FLOAT or INTEGER if cost is numeric
        allowNull: false,
    },
    Authority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Out_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "outreg",
            key: "id",
        },
    },
}, {
    tableName: "out",
    timestamps: false,
});

export default Out;