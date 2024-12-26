import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const SupSun = sequelize.define('SupSun', {
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
    supID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'suppliment',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'supsun',
    timestamps: false
});

export default SupSun;
