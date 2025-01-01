import Estimate from './Estimate.js';
import EstImage from './EstImage.js';
import ImpImage from './ImpImage.js';
import CompImage from './CompImage.js';
import Implement from './Impliment.js';
import Completion from './Completion.js';
import Supplier from './Supplier.js';
import EstMat from './EstMat.js';
// import ImpImage from './ImpImage.js';
// import Implement from './Impliment.js';

// Define associations
Estimate.hasMany(EstImage, { foreignKey: 'EstID' });
Estimate.hasMany(Supplier, { foreignKey: 'EstID' });
Implement.hasMany(ImpImage, { foreignKey: 'ImpID' });
Completion.hasMany(CompImage, { foreignKey: 'CompID' });
Supplier.hasMany(EstMat, { foreignKey: 'supID' });
// Implement.hasMany(ImpImage, { foreignKey: 'ImpID' });

EstMat.belongsTo(Supplier, { foreignKey: 'supID' });
EstImage.belongsTo(Estimate, { foreignKey: 'EstID' });
ImpImage.belongsTo(Implement, { foreignKey: 'ImpID' });
Supplier.belongsTo(Estimate, { foreignKey: 'EstID' });
CompImage.belongsTo(Completion, { foreignKey: 'CompID' });
// ImpImage.belongsTo(Implement, { foreignKey: 'ImpID' });