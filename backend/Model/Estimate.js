import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Logbook from './Logbook.js';

const Estimate = sequelize.define('Estimate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Estimated: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    logbookID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'logbook',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    // Other fields...
}, {
    tableName: 'estimates',
    timestamps: false
});

export default Estimate;