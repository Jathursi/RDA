import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Out from "./Out.js";

const OutReg = sequelize.define("OutReg", {
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
    tableName: "outreg",
    timestamps: false,
}
);

OutReg.hasMany(Out, { foreignKey: "Out_id" });
Out.belongsTo(OutReg, { foreignKey: "Out_id" });

export default OutReg;