import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Estsun = sequelize.define('Estsun', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Sundries: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sun_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EstID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estimates',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'estsun',
    timestamps: false
});

export default Estsun;