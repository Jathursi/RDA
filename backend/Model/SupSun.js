import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { Sundries: '', Sun_cost: '', SunQ: '' }

const SupSun = sequelize.define('SupSun', {
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
    tableName: 'SupSun',
    timestamps: false
});

export default SupSun;
