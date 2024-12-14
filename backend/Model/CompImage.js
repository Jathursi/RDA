import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const CompImage = sequelize.define('CompImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fileData: {
        type: DataTypes.BLOB('long'), // Store binary data
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
    tableName: 'comp_images', // Ensure this matches the table name in your database
    timestamps: false
});

export default CompImage;