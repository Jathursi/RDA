import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Attachments from './Attachments.js';

const EmailComp = sequelize.define('EmailComp', {
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
    tableName: 'emailcomp',
    timestamps: false
});

EmailComp.hasMany(Attachments, {
    foreignKey: 'emailCompId'
});
Attachments.belongsTo(EmailComp, { foreignKey: 'emailCompId' });

export default EmailComp;