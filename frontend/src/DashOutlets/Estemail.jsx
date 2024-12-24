import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './dashout.css';

const EstEmail = () => {
    const { id } = useParams();
    const [resources, setResources] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [values, setValues] = useState(
        {
            email: '',
            subject: '',
            message: '',
            attachments: [],
        }
    );
    const [emailData, setEmailData] = useState([]);

    useEffect(() => {
        const fetchResourcesAndImages = async () => {
            try {
                const res1 = await axios.get(`http://localhost:8081/api/resource/resources/${id}`);
                setResources(res1.data);

                const res2 = await axios.get(`http://localhost:8081/api/email/get-emailattach/${id}`);
                console.log('Fetched email data:', res2.data);
                setEmailData(res2.data);
            } catch (error) {
                console.error('Error fetching resources and images:', error);
            }
        };

        fetchResourcesAndImages();
    }, [id]);

    const handleFileChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const newSelectedFiles = selectedOptions.map(option => ({
            id: option.value,
            name: option.text,
            type: option.getAttribute('data-type'),
            url: option.getAttribute('data-url')
        }));

        // Use a Set to ensure unique file IDs
        const uniqueFiles = new Map(selectedFiles.map(file => [file.id, file]));
        newSelectedFiles.forEach(file => uniqueFiles.set(file.id, file));

        setSelectedFiles(Array.from(uniqueFiles.values()));
    };

    const handleRemoveFile = (fileId) => {
        setSelectedFiles(selectedFiles.filter(file => file.id !== fileId));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            values,
            attachments: selectedFiles.map(file => file.id),
            book_id: id
        };

        console.log('Sending email with formData:', formData);

        axios.post('http://localhost:8081/api/email/send-emailattach', formData)
            .then(response => {
                alert('Email sent successfully!');
                console.log('Email sent response:', response.data);
            })
            .catch(error => {
                console.error('Error sending the email:', error);
            });
    };

    return (
        <div className='template d-flex align-items-center 100-w sm:w-100 '>
            <div className='w-100 p-2 mx-1 sm:px-5 mx-5'>
            <form onSubmit={handleSubmit} className='mt-4'>
                <h2 className='formTitle pb-2 sm:pb-5'>Email</h2>
                <div className='mb-3 row'>
                    <label className='col-sm-2 col-form-label'>Email:</label>
                    <div className='col-sm-10'>
                        <input
                            type="email"
                            className='form-control'
                            value={values.email}
                            placeholder='Enter email address'
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label className='col-sm-2 col-form-label'>Subject:</label>
                    <div className='col-sm-10'>
                        <input
                            type="text"
                            className='form-control'
                            name="Subject"
                            placeholder='Enter subject'
                            value={values.subject}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label className='col-sm-2 col-form-label'>Message:</label>
                    <div className='col-sm-10'>
                        <textarea
                            className='form-control'
                            name="Message"
                            placeholder='Enter message'
                            rows={4}
                            value={values.message}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label className='col-sm-2 col-form-label'>Attachments:</label>
                    <div className='col-sm-10'>
                        <select multiple onChange={handleFileChange} className='form-select'>
                            {resources.map(resource => (
                                <option key={resource.id} value={resource.id} data-type="pdf" data-url={resource.url}>
                                    {resource.customName}
                                </option>
                            ))}
                            {images.map(image => (
                                <option key={image.id} value={image.id} data-type="image" data-url={image.url}>
                                    {image.customName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='d-grid'>
                    <button type="submit" className='btn btn-primary'>
                        Send Email
                    </button>
                </div>
            </form>
            {/* <div className='mt-4'>
                <h3>Email Attachments</h3>
                <ul>
                    {selectedFiles.map(file => (
                        <li key={file.id}>
                            <span>{file.name}</span>
                            <button onClick={() => handleRemoveFile(file.id)} className='btn btn-danger btn-sm ms-2'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div> */}
            <div className='mt-4'>
                <h3>Sended Mails Details</h3>
                <table className='table table-bordered mt-4'>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Attachments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailData.map(email => (
                            <tr key={email.id}>
                                <td>{email.email}</td>
                                <td>{email.subject}</td>
                                <td>{email.message}</td>
                                <td>
                                    <ul>
                                        {email.attachments.map(attachment => (
                                            <li key={attachment.id}>
                                                <a href={attachment.url} target='_blank' rel='noreferrer'>
                                                    {attachment.customName}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default EstEmail;