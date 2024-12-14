import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Labour: '', Lab_cost: '', LabQ: '' }

const EstLab = sequelize.define('EstLab', {
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
    EstimateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estimate',
            key: 'id'
        }
    }
},
{
    tableName: 'est_lab',
    timestamps: false
});

export default EstLab;
