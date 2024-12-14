import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import SupLab from './SupLab.js';
import SupMat from './SupMat.js';
import SupMac from './SupMac.js';
import SupTrans from './SupTrans.js';
import SupStrock from './SupStrock.js';
import SupWel from './SupWel.js';
import SupSun from './SupSun.js';
import SupOther from './SupOther.js';


const Supplement = sequelize.define('Supplement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    No: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Estimated: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'regist',
            key: 'id'
        }
    },
},
{
    tableName: 'supplement',
    timestamps: false
});

Supplement.hasMany(SupLab, { foreignKey: 'SupplierId' });
SupLab.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupMat, { foreignKey: 'SupplierId' });
SupMat.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupMac, { foreignKey: 'SupplierId' });
SupMac.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupTrans, { foreignKey: 'SupplierId' });
SupTrans.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupStrock, { foreignKey: 'SupplierId' });
SupStrock.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupWel, { foreignKey: 'SupplierId' });
SupWel.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupSun, { foreignKey: 'SupplierId' });
SupSun.belongsTo(Supplement, { foreignKey: 'SupplierId' });

Supplement.hasMany(SupOther, { foreignKey: 'SupplierId' });
SupOther.belongsTo(Supplement, { foreignKey: 'SupplierId' });


export default Supplement;