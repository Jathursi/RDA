import express from 'express';
import nodemailer from 'nodemailer';
import EmailAuth from '../model/EmailAuth.js';
import AuthAttachment from '../model/AuthAttachment.js';
import Docs from '../model/Docs.js';
import EstImage from '../model/EstImage.js';
import QutationImg from '../model/QutationImg.js';
import path from 'path';
import Implement from '../model/Impliment.js';
import Completion from '../model/Completion.js';
// import ImpImage from '../model/ImpImage.js';
// import CompImage from '../model/CompImage.js';
import dotenv from 'dotenv';
import sequelize from '../config/sequelize.js';

const router = express.Router();
dotenv.config();
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.post('/send-emailattach1/:logbookID', async (req, res) => {
    const { emails, subject, message, attachments } = req.body;
    const logbookID = req.params.logbookID;

    if (!emails || emails.length === 0) {
        return res.status(400).json({ message: 'No recipients defined' });
    }

    if (!logbookID) {
        return res.status(400).json({ message: 'No logbookID defined' });
    }

    try {
        console.log('Received email request:', { emails, subject, message, attachments, logbookID });

        // Fetch selected attachments based on provided IDs using raw SQL queries
        const [docs, estImages, qutationImg] = await Promise.all([
            attachments.length > 0 ? sequelize.query(`
                SELECT fileName, fileType, fileData, id 
                FROM docs 
                WHERE id IN (:attachments)`, 
                { 
                    replacements: { attachments },
                    type: sequelize.QueryTypes.SELECT
                }) : [],
            sequelize.query(`
                SELECT  fileSize, fileType, fileData, id 
                FROM estimage 
                WHERE EstID IN (
                    SELECT id FROM estimates WHERE logbookID = :logbookID
                )`, 
                { 
                    replacements: { logbookID },
                    type: sequelize.QueryTypes.SELECT
                }),
            sequelize.query(`
                SELECT  fileSize, fileType, fileData, id 
                FROM qutationimg 
                WHERE supID IN (
                    SELECT supplier.id FROM supplier 
                    LEFT JOIN estimates ON supplier.id = estimates.supID
                    WHERE estimates.logbookID = :logbookID
                )`, 
                { 
                    replacements: { logbookID },
                    type: sequelize.QueryTypes.SELECT
                })
        ]);

        const allFiles = [...docs, ...estImages, qutationImg ];
        console.log('Fetched files:', allFiles);

        // Map valid attachments for email
         const emailAttachments = allFiles
            .map((file, index) => {
                let filename;
                // Generate default filenames based on model type and index
                if (file instanceof EstImage) {
                    filename = `initial_fault${index + 1}`;
                } else if (file instanceof QutationImg) {
                    filename = `implementation${index + 1}`;
                } else {
                    filename = `unnamed${index + 1}`;
                }

                if (!file.fileData) {
                    console.warn('Skipping invalid file:', file);
                    return null;
                }

                return {
                    filename: filename, // Set the generated filename
                    content: Buffer.from(file.fileData), // Ensure it's a valid Buffer
                    contentType: file.fileType || 'application/octet-stream',
                    encoding: 'base64', // Ensure base64 encoding for email clients
                };
            })
            .filter(Boolean); // Remove invalid files

        console.log('Email attachments:', emailAttachments);

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
const mailOptions = {
    from: `"Busy Bugs" <${process.env.EMAIL_USER}>`, // Sender name and email
    to: emails,
    subject: subject || 'No Subject',
    html: `
        <div style="font-family: Arial, sans-serif; margin: 20px;">
            <div style="display: flex; align-items: center; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                <img src="cid:profile@cid" alt="Busy Bugs Logo" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                <h2 style="color:rgb(14, 36, 237); margin: 0;">Busy Bugs</h2>
            </div>
            <div style="text-align: center; padding: 20px;">
                <h3 style="color:rgb(62, 21, 244);">Hello ,</h3>
                <p style="font-size: 16px;"></p>
                <div style="margin: 20px auto; text-align: left; padding: 15px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); max-width: 400px;">
                    <h3 style="color:rgb(0, 0, 255);"></h3>
                    <p>Images and Pdf's belongs to ${logbookID} are attached. Please Kindly verify the Information ${message}.</p>
                </div>
            </div>
            <p style="text-align: center; color: #888; font-size: 14px;">Happy coding,<br>The Busy Bugs Team</p>
        </div>
    `,
    attachments: emailAttachments.concat([
        {
            filename: 'log.png',
            path: path.join(__dirname, './log.png'), // Update the path to the correct location of log.png
            cid: 'profile@cid', // Embed the image
        },
    ]),
};



        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');

        // Save email details and attachments in the database
        const emailCompPromises = emails.map(async email => {
            const emailComp = await EmailAuth.create({ email, book_id: logbookID, subject, message });

            const attachmentPromises = allFiles.map(async file => {
                if (!file.fileName) {
                    console.error('Skipping invalid attachment:', file);
                    return;
                }
                await AuthAttachment.create({
                    emailAuthId: emailComp.id,
                    fileId: file.id,
                    fileName: file.fileName,
                    fileType: file.fileType,
                    fileData: file.fileData.toString('base64'), // Store as base64
                });
            });

            await Promise.all(attachmentPromises);
        });

        await Promise.all(emailCompPromises);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

export default router;