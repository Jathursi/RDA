import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Feedback = sequelize.define("Feedback", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicle_num: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
    type: DataTypes.INTEGER, // Stores ratings as integers from 1 to 5
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
    tableName: "feedback",
    timestamps: false,
});

export default Feedback;