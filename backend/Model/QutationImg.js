import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Supplier from './Supplier.js';

const QutationImg = sequelize.define('QutationImg', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    supID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'qutationimg',
    timestamps: false
});

export default QutationImg;