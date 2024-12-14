import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { Labour: '', Lab_cost: '', LabQ: '' }
const SupLab = sequelize.define('SupLab', {
    Labour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Lab_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LabQ: {
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
    tableName: 'sup_lab',
    timestamps: false
});

export default SupLab;
