import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Implement = sequelize.define('Implement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Start_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Job_Assigned: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Req_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Req_off: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Auth: {
        type: DataTypes.STRING,
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
    tableName: 'implement',
    timestamps: false,
});

export default Implement;