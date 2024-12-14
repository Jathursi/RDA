import EmailComp from './EmailComp.js';
import Attachment from './Attachments.js';

// Set up associations
EmailComp.hasMany(Attachment, { foreignKey: 'emailCompId' });
Attachment.belongsTo(EmailComp, { foreignKey: 'emailCompId' });

export { EmailComp, Attachment };