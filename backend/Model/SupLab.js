import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Labour: '', Lab_cost: '', LabQ: '' }

const Suplab = sequelize.define('Suplab', {
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
            model: 'supsupplier',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'suplab',
    timestamps: false
});

export default Suplab;
