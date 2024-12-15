import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Implement = sequelize.define('Implement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    Req_off: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Vaucher: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Auth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: 'regist',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'implement',
    timestamps: true,
});

export default Implement;