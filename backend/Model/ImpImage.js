import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const ImpImage = sequelize.define('ImpImage', {
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
    ImpID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'implement',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'impimage',
    timestamps: false
});

export default ImpImage;