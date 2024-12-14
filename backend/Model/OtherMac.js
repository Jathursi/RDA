import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const OtherMac = sequelize.define("OtherMac", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Machining:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Mac_cost:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    MacQ:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Mac_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Mac_Sup:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Mac_Auth:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "othermaterials",
            key: "id",
        },
    },
},{
    tableName: "othermachines",
    timestamps: false,
}
);

export default OtherMac;