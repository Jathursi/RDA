import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const AuthAttachment = sequelize.define('AuthAttachment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    emailAuthId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emailauth',
            key: 'id'
        }
    },
    fileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileData: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'authattachment',
    timestamps: false
});

export default AuthAttachment;