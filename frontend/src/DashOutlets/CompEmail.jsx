import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './dashout.css';

const CompEmail = () => {
    const { id } = useParams();
    const [resources, setResources] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [emails, setEmails] = useState(['']);
    const [emailData, setEmailData] = useState([]);

    useEffect(() => {
        const fetchResourcesAndImages = async () => {
            try {
                const res1 = await axios.get(`http://localhost:8081/api/resource/resources/${id}`);
                setResources(res1.data);

                const res2 = await axios.get(`http://localhost:8081/api/email/get-emailattach1/${id}`);
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

    const handleEmailChange = (index, event) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
    };

    const handleAddEmail = () => {
        setEmails([...emails, '']);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = {
            emails,
            attachments: selectedFiles.map(file => file.id),
            book_id: id
        };

        console.log('Sending email with formData:', formData);

        axios.post('http://localhost:8081/api/email/send-emailattach1', formData)
            .then(response => {
                alert('Email sent successfully!');
                console.log('Email sent response:', response.data);
            })
            .catch(error => {
                console.error('Error sending the email:', error);
            });
    };

    return (
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleSubmit}>
                    <h3>Authority Email</h3>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            <button type="button" onClick={handleAddEmail} className="addButton">Add Email</button>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            {emails.map((email, index) => (
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleEmailChange(index, e)}
                                    className="form-control"
                                    required
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">subject:</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="subject"
                                // value={values.subject}
                                // onChange={(e) => setValues({ ...values, subject: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Message:</label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                name="message"
                                rows={5}
                                // value={values.message}
                                // onChange={(e) => setValues({ ...values, message: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Attachments:</label>
                        <div className="col-sm-10">
                            <select multiple onChange={handleFileChange} className="form-control">
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
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Selected Files:</label>
                        <div className="col-sm-10">
                            {selectedFiles.map(file => (
                                <div key={file.id} className="selectedFile">
                                    <input
                                        type="text"
                                        value={file.name}
                                        readOnly
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(file.id)}
                                        className="removeButton"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
        // <div className='formContainer-imp'>
            
        //     <div className='formTitle'>Authority Email</div>
        //     <form onSubmit={handleSubmit} className='form'>
        //         <div className='form-Multi-btn'>
        //             <label>Email:</label>
        //             <button type="button" onClick={handleAddEmail} className='addButton'>Add Email</button>
        //         </div>
        //         <div className='formGroup'>
        //             {emails.map((email, index) => (
        //                 <div key={index} className='formGroup'>
        //                     <input 
        //                         type="email" 
        //                         value={email} 
        //                         onChange={(e) => handleEmailChange(index, e)} 
        //                         className='input'
        //                         required 
        //                     />
        //                 </div>
        //             ))}
        //         </div>
                
        //         <div className='formGroup'>
        //             <label className='label'>Attachments:</label>
        //             <select multiple onChange={handleFileChange} className='input-select'>
        //                 {/* <option value="">Select Files</option> */}
        //                 {resources.map(resource => (
        //                     <option key={resource.id} value={resource.id} data-type="pdf" data-url={resource.url}>
        //                         {resource.customName}
        //                     </option>
        //                 ))}
        //                 {images.map(image => (
        //                     <option key={image.id} value={image.id} data-type="image" data-url={image.url}>
        //                         {image.customName}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         <div className='formGroup'>
        //             {selectedFiles.map(file => (
        //                 <div key={file.id} className='selectedFile'>
        //                     <input 
        //                         type="text" 
        //                         value={file.name} 
        //                         readOnly 
        //                         className='input'
        //                     />
        //                     <button 
        //                         type="button" 
        //                         onClick={() => handleRemoveFile(file.id)}
        //                         className='removeButton'
        //                     >
        //                         Remove
        //                     </button>
        //                 </div>
        //             ))}
        //         </div>

        //         <div className='form-Imp-btn'>
        //             <button type="submit">Send Email</button>
        //         </div>
        //     </form>
        //     <div className='tableContainer'>
        //         <h3>Email Data</h3>
        //         <table className='dataTable'>
        //             <thead>
        //                 <tr>
        //                     <th>ID</th>
        //                     <th>Email</th>
        //                     <th>Attachments</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {emailData.emailComp && emailData.emailComp.map(email => {
        //                     const attachments = emailData.attachments
        //                         .filter(attach => attach.emailCompId === email.id)
        //                         .map(attach => attach.fileName)
        //                         .join(', ');

        //                     return (
        //                         <tr key={email.id}>
        //                             <td>{email.id}</td>
        //                             <td>{email.email}</td>
        //                             <td>{attachments}</td>
        //                         </tr>
        //                     );
        //                 })}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
};

export default CompEmail;