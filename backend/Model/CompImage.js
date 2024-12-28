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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'completion',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'compimage',
    timestamps: false
});

export default CompImage;