import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { Welding: '', Wel_cost: '', WelQ: '' }
const SupWel = sequelize.define('SupWel', {
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
    tableName: 'SupWel',
    timestamps: false
});

export default SupWel;
