import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

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
  quasupplier_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'supplier',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  quatationsupplier_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'supplier',
        key: 'id'
        },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'material',
  timestamps: true,
});

// Define the relationship
// Material.belongsTo(sequelize.models.Implement, { foreignKey: 'implement_id' });
// Material.belongsTo(sequelize.models.Supplier, { foreignKey: 'quasupplier_id' });

export default Material;