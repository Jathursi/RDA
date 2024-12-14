import { Sequelize, DataTypes } from 'sequelize';
// import sequelize from '../config/database';
import sequelize from "../config/sequelize.js";
// import sequelize from '../config/sequelize';
// const Regist = require('./Regist'); // Adjust the path as necessary

const Complete = sequelize.define('Complete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supervised: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initiated: {
        type: DataTypes.STRING,
        allowNull: false
    },
    closed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    approved: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aditional_fault: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'regist',
            key: 'id'
        }
    }
}, {
    tableName: 'complete',
    timestamps: false
});

export default Complete;