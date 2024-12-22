import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Machining: '', Mac_cost: '', MacQ: '' }

const Estmac = sequelize.define('Estmac', {
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
    tableName: 'estmac',
    timestamps: false
});

export default Estmac;
