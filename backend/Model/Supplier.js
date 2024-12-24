import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Estimate from './Estimate.js';

const Supplier = sequelize.define('Supplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Suppliers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    QuotationNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    EstID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estimate,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'supplier',
    timestamps: true,
});

export default Supplier;