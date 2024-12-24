import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Logbook from './Logbook.js';

const Estimate = sequelize.define('Estimate', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Estimated: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    LogbookID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Logbook,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'estimates',
    timestamps: true,
});

export default Estimate;