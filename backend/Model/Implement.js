// models/Implement.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Labour from './Labour.js'; // Import the Labour model
import Material from './Material.js'; // Import the Material model

const Implement = sequelize.define('Implement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Start_Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Job_Assigned: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Req_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Req_off: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Vaucher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Auth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'implement',
  timestamps: true,
});

// Define associations
Implement.hasMany(Labour, { foreignKey: 'implement_id' });
Labour.belongsTo(Implement, { foreignKey: 'implement_id' });

Implement.hasMany(Material, { foreignKey: 'implement_id' });
Material.belongsTo(Implement, { foreignKey: 'implement_id' });


export default Implement;
