import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Sundries: '', Sun_cost: '', SunQ: '' }

const EstSun = sequelize.define('EstSun', {
    Sundries: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sun_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SunQ: {
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
    tableName: 'est_sun',
    timestamps: false
});

export default EstSun;
