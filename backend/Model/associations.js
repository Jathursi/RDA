import Estimate from './Estimate.js';
import EstImage from './EstImage.js';
import ImpImage from './ImpImage.js';
import CompImage from './CompImage.js';
import Implement from './Impliment.js';
import Completion from './Completion.js';

// Define associations
Estimate.hasMany(EstImage, { foreignKey: 'EstID' });
Implement.hasMany(ImpImage, { foreignKey: 'ImpID' });
Completion.hasMany(CompImage, { foreignKey: 'CompID' });

EstImage.belongsTo(Estimate, { foreignKey: 'EstID' });
ImpImage.belongsTo(Implement, { foreignKey: 'ImpID' });
CompImage.belongsTo(Completion, { foreignKey: 'CompID' });