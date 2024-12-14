import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Attachment = sequelize.define('Attachment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    emailCompId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emailcomp',
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
    tableName: 'attachments',
    timestamps: false
});

export default Attachment;