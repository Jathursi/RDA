import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const EstImage = sequelize.define('EstImage', {
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
    EstID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estimates',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'estimage',
    timestamps: false
});

export default EstImage;