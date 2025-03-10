import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcrypt';

const Login = sequelize.define('Login', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Ensure vehicleNumber is unique and indexed
  },
  approval: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
  lastOnline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'logins',
  timestamps: true,
  hooks: {
    afterSync: async (options) => {
      const hashedPassword = await bcrypt.hash('jathu', 10); 
      await Login.findOrCreate({
        where: { email: 'jathukirubajathu@gmail.com' },
        defaults: {
          first_Name: 'Jathu',
          email: 'jathukirubajathu@gmail.com',
          password: hashedPassword, 
          role: 'Superadmin',
          approval: 'Approved',
        },
      });
    },
  },
});

export default Login;