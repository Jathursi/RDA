import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import e from "express";

    // { Sundries: '', Sun_cost: '', SunQ: '', Sun_date: '', Sun_Sup: '', Sun_Auth: '' }

const OtherSun = sequelize.define("OtherSun", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Sundries:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Sun_cost:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    SunQ:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Sun_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Sun_Sup:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Sun_Auth:{
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
    tableName: "othersuns",
    timestamps: false,
}
);

export default OtherSun;
