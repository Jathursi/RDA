import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Sundries: '', Sun_cost: '', SunQ: '' }

const Estsun = sequelize.define('Estsun', {
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
    tableName: 'estsun',
    timestamps: false
});

export default Estsun;
