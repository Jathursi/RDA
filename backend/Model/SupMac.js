import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const SupMac = sequelize.define('SupMac', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Machining: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mac_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MacQ: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supsupplier',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'supmac',
    timestamps: false
});

export default SupMac;