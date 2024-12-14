import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { Stock: '', Stock_cost: '', StockQ: '' }
const SupStrock = sequelize.define('SupStrock', {
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
    SupplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplement',
            key: 'id'
        }
    }
},
{
    tableName: 'SupStrock',
    timestamps: false
});

export default SupStrock;
