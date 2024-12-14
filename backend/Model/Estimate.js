import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import EstLab from "./EstLab.js";
import EstMat from "./EstMat.js";
import EstMac from "./EstMac.js";
import EstTrans from "./EstTrans.js";
import EstStock from "./EstStock.js";
import EstWel from "./EstWel.js";
import EstSun from "./EstSun.js";
import EstOther from "./EstOther.js";


const Estimate = sequelize.define("Estimate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Estimated: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Regist",
            key: "id",
        },
    },
},{
    tableName: "estimate",
    timestamps: false,
}
);

Estimate.hasMany(EstLab, { foreignKey: "EstimateId" });
EstLab.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstMat, { foreignKey: "EstimateId" });
EstMat.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstMac, { foreignKey: "EstimateId" });
EstMac.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstTrans, { foreignKey: "EstimateId" });
EstTrans.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstStock, { foreignKey: "EstimateId" });
EstStock.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstWel, { foreignKey: "EstimateId" });
EstWel.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstSun, { foreignKey: "EstimateId" });
EstSun.belongsTo(Estimate, { foreignKey: "EstimateId" });

Estimate.hasMany(EstOther, { foreignKey: "EstimateId" });
EstOther.belongsTo(Estimate, { foreignKey: "EstimateId" });

export default Estimate;