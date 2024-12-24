import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Estimate from './Estimate.js';
import Suppliment from './Suppliment.js';

const SupSupplier = sequelize.define('SupSupplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Suppliers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supplimentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Suppliment,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'supsupplier',
    timestamps: true,
});

export default SupSupplier;