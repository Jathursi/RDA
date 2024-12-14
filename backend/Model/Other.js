import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import OtherMac from "./OtherMac.js";
// import OtherMat from "./OtherMat.js";
// import OtherLab from "./OtherLab.js";
import OtherTrans from "./OtherTrans.js";
import OtherStock from "./OtherStock.js";
import OtherWel from "./OtherWel.js";
import OtherSun from "./OtherSun.js";
import OtherOther from "./OtherOther.js";

const Other = sequelize.define("Other", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "regist",
            key: "id",
        },
    },
},{
    tableName: "othermaterials",
    timestamps: false,
}
);

Other.hasMany(OtherMac, { foreignKey: "other_id" });
OtherMac.belongsTo(Other, { foreignKey: "other_id" });

Other.hasMany(OtherTrans, { foreignKey: "other_id" });
OtherTrans.belongsTo(Other, { foreignKey: "other_id" });

Other.hasMany(OtherStock, { foreignKey: "other_id" });
OtherStock.belongsTo(Other, { foreignKey: "other_id" });

Other.hasMany(OtherWel, { foreignKey: "other_id" });
OtherWel.belongsTo(Other, { foreignKey: "other_id" });

Other.hasMany(OtherSun, { foreignKey: "other_id" });
OtherSun.belongsTo(Other, { foreignKey: "other_id" });

Other.hasMany(OtherOther, { foreignKey: "other_id" });
OtherOther.belongsTo(Other, { foreignKey: "other_id" });

export default Other;