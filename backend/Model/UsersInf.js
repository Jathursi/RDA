// models/UsersInf.js

import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import UserInfDet from './UserInfdet.js';
const UsersInf = sequelize.define('UsersInf', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "regist",
            key: "id",
        },
    },
}, {
    tableName: 'usersinf',
    timestamps: true,
});

UsersInf.hasMany(UserInfDet, { foreignKey: "usedet_id" });
UserInfDet.belongsTo(UsersInf, { foreignKey: "usedet_id" });

export default UsersInf;
