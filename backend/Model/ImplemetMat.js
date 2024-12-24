import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const ImplementMat = sequelize.define('ImplementMat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    logbookID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'logbook',
            key: 'id',
        },
    },
}, {
    tableName: 'implementmat',
    timestamps: false,
});

export default ImplementMat;
