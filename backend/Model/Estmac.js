import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Estmac = sequelize.define('Estmac', {
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
            model: 'supplier',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'estmac',
    timestamps: false
});

export default Estmac;