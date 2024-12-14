// models/AdditionalData.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Implement from './Implement.js'; // Import the Implement model

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Mat_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  MatQ: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  issued: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  implement_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'implement',
      key: 'id'
    }
  },
}, {
  tableName: 'material',
  timestamps: true,
});

// Define the relationship
// Material.belongsTo(Implement, { foreignKey: 'implement_id' });

export default Material;
