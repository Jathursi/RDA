import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
// import Estimate from "./Estimate.js";

    // { Material: '', Mat_cost: '', MatQ: '' }

const EstMat = sequelize.define('EstMat', {
    Material: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mat_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    MatQ: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    EstID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estimates',
            key: 'id'
        }
    },
},
{
    tableName: 'estmat',
    timestamps: false
});

export default EstMat;

