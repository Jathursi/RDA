import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Logbook from './Logbook.js';

const Suppliment = sequelize.define('Suppliment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    No: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'suppliment',
    timestamps: true,
});

export default Suppliment;