import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Transport: '', Trans_cost: '', TransQ: '' }

const EstTrans = sequelize.define("EstTrans", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Transport:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Trans_cost:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    TransQ:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    supID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplier',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
},
{
    tableName : 'esttrans',
    timestamps: false
});

export default EstTrans;
