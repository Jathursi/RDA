import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Docs = sequelize.define('Docs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    LogbookID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'logbook',
            key: 'id'
        }
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
        type: DataTypes.BLOB('long'), // Use BLOB to store binary data
        allowNull: false
    }
}, {
    tableName: 'docs',
    timestamps: false
});

export default Docs;