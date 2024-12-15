import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Trchecklist = sequelize.define('Trchecklist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        allowNull: false,
        references: {
            model: 'regist',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    regist_id: {
        type: DataTypes.STRING, // Change this to STRING to match the id field in Regist
        references: {
            model: 'regist',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'trchecklist', // Ensure this matches the table name in your database
    timestamps: false
});

export default Trchecklist;