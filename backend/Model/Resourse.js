import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Resourse = sequelize.define('Resourse', {
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
},
{
    tableName: 'resourse',
    timestamps: false
});

export default Resourse;
