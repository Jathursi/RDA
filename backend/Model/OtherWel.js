import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Welding: '', Wel_cost: '', WelQ: '', Wel_date: '', Wel_Sup: '', Wel_Auth: '' }

const OtherWel = sequelize.define("OtherWel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Welding:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Wel_cost:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    WelQ:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Wel_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Wel_Sup:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Wel_Auth:{
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
    tableName: "otherweldings",
    timestamps: false,
}
);  

export default OtherWel;
