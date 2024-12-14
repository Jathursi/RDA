import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

    // { Transport: '', Trans_cost: '', TransQ: '', Trans_date: '', Trans_Sup: '', Trans_Auth: '' }

const OtherTrans = sequelize.define("OtherTrans", {
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
    Trans_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Trans_Sup:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Trans_Auth:{
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
    tableName: "othertrans",
    timestamps: false,
}
);

export default OtherTrans;
