import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Supplier from "./Supplier.js";

const EstMat = sequelize.define('EstMat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // defaultValue: Sequelize.UUIDV4, // Use UUID for unique id generation
    },
    Material: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mat_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    MatQ: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    supID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'estmat',
    timestamps: false,
});

export default EstMat;