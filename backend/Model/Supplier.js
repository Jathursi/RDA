import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Material from './Material.js';
import QutationImg from './QutationImg.js';
const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Quotation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  implement_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'implement',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'supplier',
  timestamps: false
});

// Define the relationship
// Supplier.belongsTo(sequelize.models.Implement, { foreignKey: 'implement_id' });

Supplier.hasMany(Material, { foreignKey: 'quatationsupplier_id' });
Material.belongsTo(Supplier, { foreignKey: 'quatationsupplier_id' });

Supplier.hasMany(QutationImg, { foreignKey: 'quatationsupplier_id' });
QutationImg.belongsTo(Supplier, { foreignKey: 'quatationsupplier_id' });


export default Supplier;