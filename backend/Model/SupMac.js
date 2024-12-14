import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Supplement from './Supplement.js';

    // { Machining: '', Mac_cost: '', MacQ: '' }

const SupMac = sequelize.define('SupMac', {
    Machining: {
        type: DataTypes.STRING,
    },
    Mac_cost: {
        type: DataTypes.STRING,
    },
    MacQ: {
        type: DataTypes.STRING,
    },
    SupplierId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'supplement',
            key: 'id'
        }
    }
},
{
    tableName: 'sup_mac',
    timestamps: false
});

export default SupMac;
