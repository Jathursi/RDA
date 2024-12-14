import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { other: '', other_cost: '', otherQ: '' }
const SupOther = sequelize.define('SupOther', {
    other: {
        type: DataTypes.STRING,
        allowNull: false
    },
    other_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otherQ: {
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
    tableName: 'sup_other',
    timestamps: false
});

export default SupOther;