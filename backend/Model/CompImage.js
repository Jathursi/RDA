import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const CompImage = sequelize.define('CompImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fileData: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
    CompID: {
        type: DataTypes.INTEGER, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: 'completion',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'compimage', // Ensure this matches the table name in your database
    timestamps: false
});

export default CompImage;