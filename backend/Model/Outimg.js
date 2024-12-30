import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Supplier from './Supplier.js';

const Outimg = sequelize.define('Outimg', {
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
    OutID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'outsource',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'outimg',
    timestamps: false
});

export default Outimg;