import express from 'express';
import nodemailer from 'nodemailer';
import Resourse from '../Model/Resourse.js';
import ImpImage from '../Model/ImpImage.js';
import InImage from '../Model/InImage.js';
import CompImage from '../Model/CompImage.js';
import EmailComp from '../Model/EmailComp.js';
import Attachments from '../Model/Attachments.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/send-emailattach1', async (req, res) => {
    const { emails, attachments, book_id } = req.body;

    if (!emails || emails.length === 0) {
        return res.status(400).json({ message: 'No recipients defined' });
    }

    if (!book_id) {
        return res.status(400).json({ message: 'No book_id defined' });
    }

    try {
        console.log('Received email request with attachments:', attachments);
        console.log('Email recipients:', emails);
        console.log('Book ID:', book_id);

        // Fetch the selected files (PDFs and images) from the database
        const files = await Resourse.findAll({
            where: {
                id: attachments
            }
        });
        const impImages = await ImpImage.findAll({
            where: {
                id: attachments
            }
        });

        const inImages = await InImage.findAll({
            where: {
                id: attachments
            }
        });

        const comImages = await CompImage.findAll({
            where: {
                id: attachments
            }
        });

        const allFiles = [...files, ...impImages, ...inImages, ...comImages];

        console.log('Fetched files from database:', allFiles);

        // Create email attachments
        const emailAttachments = allFiles.map(file => {
            const fileType = file.fileType || 'application/octet-stream'; // Fallback for unknown types

            return {
                filename: file.customName, // Or file.filename, if it exists
                content: Buffer.from(file.fileData, 'base64'), // Decode base64-encoded binary data
                contentType: fileType, // Use the correct file type (e.g., 'application/pdf', 'image/jpeg')
            };
        });

        console.log('Email attachments:', emailAttachments);

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emails, // Use the array of emails
            subject: 'Sending the final details',
            text: 'Best Regards',
            attachments: emailAttachments
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Save email details and attachments to the database
        const emailCompPromises = emails.map(async email => {
            const emailComp = await EmailComp.create({
                email: email,
                book_id: book_id
            });

            const attachmentPromises = attachments.map(async attachmentId => {
                const file = allFiles.find(file => file.id === parseInt(attachmentId));
                if (file) {
                    console.log('Creating attachment:', {
                        emailCompId: emailComp.id,
                        fileId: file.id,
                        fileName: file.customName,
                        fileType: file.fileType,
                        fileData: file.fileData
                    });
                    await Attachments.create({
                        emailCompId: emailComp.id,
                        fileId: file.id,
                        fileName: file.customName,
                        fileType: file.fileType,
                        fileData: file.fileData
                    });
                } else {
                    console.log('File not found for attachmentId:', attachmentId);
                }
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

// Get all emails data from EmailComp table and Attachments table by book_id
router.get('/get-emailattach1/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Fetching email and attachments for book_id:', id);
        const emailComp = await EmailComp.findAll({
            where: {
                book_id: id
            }
        });

        const emailCompIds = emailComp.map(email => email.id);

        const attachments = await Attachments.findAll({
            where: {
                emailCompId: emailCompIds
            }
        });

        console.log('Fetched emailComp:', emailComp);
        console.log('Fetched attachments:', attachments);

        res.status(200).json({ emailComp, attachments });
    } catch (error) {
        console.error('Error fetching email and attachments:', error);
        res.status(500).json({ message: 'Error fetching email and attachments', error: error.message });
    }
});

export default router;