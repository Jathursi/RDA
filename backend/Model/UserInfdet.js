import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const UserInfDet = sequelize.define('UserInfDet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usedet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usersinf",
            key: "id",
        },
    },
}, {
    tableName: 'userinfdet',
    timestamps: true,
});

export default UserInfDet;