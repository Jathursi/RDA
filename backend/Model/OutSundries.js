import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const OutSundries = sequelize.define('OutSundries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Sundries: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sun_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OutID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'outsource',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'OutSundries',
    timestamps: false
});

export default OutSundries;