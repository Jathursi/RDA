import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Other = sequelize.define('Other', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    book_id: {
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: "regist",
            key: "id",
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: "othermaterials",
    timestamps: false,
});

export default Other;