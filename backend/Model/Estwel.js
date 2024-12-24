import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Welding: '', Wel_cost: '', WelQ: '' }

const Estwel = sequelize.define('Estwel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Welding: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Wel_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    WelQ: {
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
    tableName: 'estwel',
    timestamps: false
});

export default Estwel;

