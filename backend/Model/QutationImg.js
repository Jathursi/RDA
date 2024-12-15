import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const QutationImg = sequelize.define('QutationImg', {
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
    quatationsupplier_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'supplier',
        key: 'id'
        }
    },
},
{
    tableName: 'qutationimg',
    timestamps: false
});

export default QutationImg;
