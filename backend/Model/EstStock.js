import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Stock: '', Stock_cost: '', StockQ: '' }

const EstStock = sequelize.define('EstStock', {
    Stock: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stock_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StockQ: {
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
    tableName: 'est_stock',
    timestamps: false
});

export default EstStock;
