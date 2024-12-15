import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Labour from './Labour.js';
import Material from './Material.js';
import Supplier from './Supplier.js';
import QutationImg from './QutationImg.js';

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
  Auth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.STRING, // Ensure this matches the id field in Regist
    allowNull: false,
    references: {
      model: 'regist',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'implement',
  timestamps: true,
});

// Define associations
Implement.hasMany(Labour, { foreignKey: 'implement_id' });
Labour.belongsTo(Implement, { foreignKey: 'implement_id' });

Implement.hasMany(Supplier, { foreignKey: 'implement_id' });
Supplier.belongsTo(Implement, { foreignKey: 'implement_id' });

export default Implement;