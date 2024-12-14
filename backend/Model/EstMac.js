import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Machining: '', Mac_cost: '', MacQ: '' }

const EstMac = sequelize.define('EstMac', {
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
    tableName: 'est_mac',
    timestamps: false
});

export default EstMac;
