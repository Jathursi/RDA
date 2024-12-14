import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
    // { other: '', other_cost: '', otherQ: '' }

const EstOther = sequelize.define('est_other', {
    other: {
        type: DataTypes.STRING,
        allowNull: false
    },
    other_cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otherQ: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EstimateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "estimate",
            key: 'id'
        }
    }
},
{
    tableName: 'est_other',
    timestamps: false
});

export default EstOther;
