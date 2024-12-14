// models/Labour.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
// import Implement from './Implement.js'; // Import the Implement model

const Labour = sequelize.define('Labour', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Labour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Lab_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  LabQ: {
    type: DataTypes.INTEGER,
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
  tableName: 'labour',
  timestamps: true,
});

// Define the relationship
// Labour.belongsTo(Implement, { foreignKey: 'implement_id' });

export default Labour;
