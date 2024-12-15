import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Estimate = sequelize.define('Estimate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Estimated: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: 'Regist',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'estimate',
    timestamps: false,
});

export default Estimate;