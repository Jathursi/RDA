import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../config/sequelize.js";

const Completion = sequelize.define('Completion', {
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
    close_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    approved: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Voucher: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aditional_fault: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_id: {
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        references: {
            model: 'logbook',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'completion',
    timestamps: false
});

export default Completion;