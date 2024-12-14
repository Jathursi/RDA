import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import AttachAuth from './AttachAuth.js';

const EmailAuth = sequelize.define('EmailAuth', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'regist',
            key: 'id'
        }
    }
}, {
    tableName: 'emailauth',
    timestamps: false
});

EmailAuth.hasMany(AttachAuth, {
    foreignKey: 'emailAuthId'
});
AttachAuth.belongsTo(EmailAuth, { foreignKey: 'emailAuthId' });

export default EmailAuth;