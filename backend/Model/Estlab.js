import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Labour: '', Lab_cost: '', LabQ: '' }

const Estlab = sequelize.define('Estlab', {
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
    EstID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estimates',
            key: 'id'
        }
    }
},
{
    tableName: 'estlab',
    timestamps: false
});

export default Estlab;
