import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Supplier from './Supplier.js';
// import SupSupplier from './SupSupplier.js';
import SupSupplier from './SupSupplier.js';

const SupQuotation = sequelize.define('SupQuotation', {
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
            model: SupSupplier,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'supquotation',
    timestamps: false
});

export default SupQuotation;