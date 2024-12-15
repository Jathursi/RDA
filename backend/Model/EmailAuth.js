import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

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
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: 'regist',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'emailauth',
    timestamps: false
});

export default EmailAuth;