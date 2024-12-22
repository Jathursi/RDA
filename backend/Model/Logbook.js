import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Logbook = sequelize.define('Logbook', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Vehicle_num: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Fault: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Inspected: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Meter: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Reference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Response: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CrossCheckby: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'logins', 
            key: 'id',
        },
    },
}, {
    tableName: 'logbook',
    timestamps: true,
    hooks: {
        beforeCreate: async (logbook, options) => {
            const currentYear = new Date().getFullYear();
            const lastRegist = await Logbook.findOne({
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear),
                order: [['createdAt', 'DESC']]
            });
            let newId;
            if (lastRegist) {
                const lastId = lastRegist.id.split('/')[0];
                const incrementedId = String(parseInt(lastId) + 1).padStart(3, '0');
                newId = `${incrementedId}.R.${currentYear}`;
            } else {
                newId = `001.R.${currentYear}`;
            }
            logbook.id = newId;
        }
    }
});

export default Logbook;