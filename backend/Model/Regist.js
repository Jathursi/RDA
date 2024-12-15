import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import OutReg from './OutReg.js';
import Estimate from './Estimate.js';
import Implement from './Implement.js';
import Supplement from './Supplement.js';
import Other from './Other.js';
import InImage from './InImage.js';
import CompImage from './CompImage.js';
import ImpImage from './ImpImage.js';
import UsersInf from './UsersInf.js';
import EmailComp from './EmailComp.js';
import trchecklist from './Trchecklist.js';

const Regist = sequelize.define('Regist', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Vehicle_num: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Year: {
        type: DataTypes.STRING,
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
    CrossCheck: {
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
    tableName: 'regist',
    timestamps: true,
    hooks: {
        beforeCreate: async (regist, options) => {
            const currentYear = new Date().getFullYear();
            const lastRegist = await Regist.findOne({
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

            regist.id = newId;
        }
    }
});

// Associations...

Regist.hasMany(OutReg, { foreignKey: 'book_id' });
OutReg.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(Estimate, { foreignKey: 'book_id' });
Estimate.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(Implement, { foreignKey: 'book_id' });
Implement.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(Supplement, { foreignKey: 'book_id' });
Supplement.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(Other, { foreignKey: 'book_id' });
Other.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(InImage, { foreignKey: 'book_id' });
InImage.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(CompImage, { foreignKey: 'book_id' });
CompImage.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(ImpImage, { foreignKey: 'book_id' });
ImpImage.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(UsersInf, { foreignKey: 'book_id' });
UsersInf.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(EmailComp, { foreignKey: 'book_id' });
EmailComp.belongsTo(Regist, { foreignKey: 'book_id' });

Regist.hasMany(trchecklist, { foreignKey: 'regist_id' });
trchecklist.belongsTo(Regist, { foreignKey: 'regist_id' });

export default Regist;