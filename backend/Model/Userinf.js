import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Userinf = sequelize.define('Userinf', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    book_id:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'logbook',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName: 'userinf',
    timestamps: false
});

export default Userinf;