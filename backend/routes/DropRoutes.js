import express from 'express';
import Logbook from '../model/Logbook.js';
import Login from '../model/Login.js';
import Implement from '../model/Impliment.js';
import Estimate from '../model/Estimate.js';
import Completion from '../model/Completion.js';
import Suppliment from '../model/Suppliment.js';

const router = express.Router();

router.get('/names', async (req, res) => {
    try {
        // Fetch approved admin names from logins
        const approvedAdmins = await Login.findAll({
            where: { approval: 'Approved', role: 'Admin' },
            attributes: ['first_Name']
        });

        // Fetch names from logbook
        const logbookNames = await Logbook.findAll({
            attributes: ['Inspected', 'CrossCheckby']
        });

        // Fetch names from implement
        const implementNames = await Implement.findAll({
            attributes: ['Job_Assigned']
        });

        // Fetch names from estimate
        const estimateNames = await Estimate.findAll({
            attributes: ['Estimated']
        });

        // Fetch names from suppliment
        const supplimentNames = await Suppliment.findAll({
            attributes: ['Estimated']
        });

        // Fetch names from completion
        const completionNames = await Completion.findAll({
            attributes: ['supervised', 'initiated', 'closed', 'approved']
        });

        // Combine all names into a single array and remove duplicates
        const allNames = [
            ...approvedAdmins.map(admin => admin.first_Name),
            ...logbookNames.map(logbook => logbook.Inspected),
            ...logbookNames.map(logbook => logbook.CrossCheckby),
            ...implementNames.map(implement => implement.Job_Assigned),
            ...estimateNames.map(estimate => estimate.Estimated),
            ...supplimentNames.map(suppliment => suppliment.Estimated),
            ...completionNames.map(completion => completion.supervised),
            ...completionNames.map(completion => completion.initiated),
            ...completionNames.map(completion => completion.closed),
            ...completionNames.map(completion => completion.approved)
        ];

        const uniqueNames = [...new Set(allNames)].filter(name => name); // Remove duplicates and filter out empty names

        res.status(200).json({ uniqueNames });
    } catch (error) {
        console.error('Error fetching names:', error);
        res.status(500).json({ error: 'An error occurred while fetching names.' });
    }
});

export default router;