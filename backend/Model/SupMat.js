import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

    // { Material: '', Mat_cost: '', MatQ: '' }

const SupMat = sequelize.define('SupMat', {
    Material: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mat_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MatQ: {
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
    tableName: 'sup_mat',
    timestamps: false
});

export default SupMat;
