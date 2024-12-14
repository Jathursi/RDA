import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Welding: '', Wel_cost: '', WelQ: '' }

const EstWel = sequelize.define('EstWel', {
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
    tableName: 'est_wel',
    timestamps: false
});

export default EstWel;

