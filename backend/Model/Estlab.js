import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Labour: '', Lab_cost: '', LabQ: '' }

const Estlab = sequelize.define('Estlab', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Labour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lab_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LabQ: {
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
    tableName: 'estlab',
    timestamps: false
});

export default Estlab;
