import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// other: '', other_cost: '', otherQ: '', other_date: '', other_Sup: '', other_Auth: ''

const OtherOther = sequelize.define("OtherOther", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    other:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_cost:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otherQ:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_Sup:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    other_Auth:{
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
    tableName: "othersothers",
    timestamps: false,
}
);

export default OtherOther;