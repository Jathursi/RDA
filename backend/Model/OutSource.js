import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const OutSource = sequelize.define('OutSource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Job_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Authority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LogbookID:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'logbook',
            key: 'id'
        },
    }
}, {
    tableName: 'outsource',
    timestamps: false
});

export default OutSource;