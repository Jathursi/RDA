// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './dashout.css';

// const CompEmail = () => {
//     const { id } = useParams();
//     const [resources, setResources] = useState([]);
//     const [selectedDocs, setSelectedDocs] = useState([]); // Store selected files
//     const [emails, setEmails] = useState(['']);
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 const docsResponse = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
                
//                 setResources(docsResponse.data);
//             } catch (error) {
//                 console.error('Error fetching resources:', error);
//             }
//         };

//         fetchResources();
//     }, [id]);

//     const handleFileChange = (event) => {
//         const selectedOptions = Array.from(event.target.selectedOptions); // Multi-select
//         const newSelectedDocs = selectedOptions.map(option => ({
//             id: option.value,
//             name: option.text,
//         }));

//         // Avoid duplicates
//         const uniqueDocs = [...selectedDocs, ...newSelectedDocs].filter(
//             (file, index, self) => index === self.findIndex(f => f.id === file.id)
//         );

//         setSelectedDocs(uniqueDocs); // Update state with unique selected files
//     };

//     const handleRemoveFile = (fileId) => {
//         // Remove file by ID
//         setSelectedDocs(selectedDocs.filter(file => file.id !== fileId));
//     };

//     const handleEmailChange = (index, event) => {
//         const newEmails = [...emails];
//         newEmails[index] = event.target.value;
//         setEmails(newEmails);
//     };

//     const handleAddEmail = () => {
//         setEmails([...emails, '']);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = {
//             emails,
//             subject,
//             message,
//             attachments: selectedDocs.map(file => file.id), // Only send IDs
//         };

//         try {
//             await axios.post(`http://localhost:8081/api/email/send-emailattach1/${id}`, formData);
//             alert('Email sent successfully!');
//         } catch (error) {
//             console.error('Error sending email:', error);
//             alert('Error sending email.');
//         }
//     };

//     return (
//         <div className="template d-flex align-items-center w-100 sm:w-100">
//             <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//                 <form onSubmit={handleSubmit}>
//                     <h3>Authority Email</h3>
//                     <div className="mb-3">
//                         {emails.map((email, index) => (
//                             <input
//                                 key={index}
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => handleEmailChange(index, e)}
//                                 className="form-control"
//                                 placeholder="Enter recipient email"
//                                 required
//                             />
//                         ))}
//                         <button type="button" onClick={handleAddEmail} className="btn btn-secondary mt-2">
//                             Add Email
//                         </button>
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             value={subject}
//                             onChange={(e) => setSubject(e.target.value)}
//                             className="form-control"
//                             placeholder="Enter email subject"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <textarea
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="form-control"
//                             placeholder="Enter your message"
//                             rows="4"
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label>Select Documents (optional):</label>
//                         <select
//                             multiple
//                             onChange={handleFileChange}
//                             className="form-control"
//                             style={{ height: '150px' }}
//                         >
//                             {resources.map(resource => (
//                                 <option key={resource.id} value={resource.id}>
//                                     {resource.fileName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="mb-3">
//                         <h5>Selected Documents:</h5>
//                         {selectedDocs.map(file => (
//                             <div key={file.id} className="d-flex align-items-center mb-2">
//                                 <span className="me-2">{file.name}</span>
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemoveFile(file.id)}
//                                     className="btn btn-danger btn-sm"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Send Email
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CompEmail;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './dashout.css';

const CompEmail = () => {
    const { id } = useParams();
    const [resources, setResources] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState([]); // Store selected files
    const [emails, setEmails] = useState([]); // Store emails as an array of strings
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [emailInput, setEmailInput] = useState(''); // For the current email being typed

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const docsResponse = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
                setResources(docsResponse.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, [id]);

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (emailInput.trim() !== '' && validateEmail(emailInput.trim())) {
            setEmails([...emails, emailInput.trim()]);
            setEmailInput('');
        }
    };

    const handleRemoveEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    };

    const handleFileChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const newSelectedDocs = selectedOptions.map(option => ({
            id: option.value,
            name: option.text,
        }));

        const uniqueDocs = [...selectedDocs, ...newSelectedDocs].filter(
            (file, index, self) => index === self.findIndex(f => f.id === file.id)
        );

        setSelectedDocs(uniqueDocs);
    };

    const handleRemoveFile = (fileId) => {
        setSelectedDocs(selectedDocs.filter(file => file.id !== fileId));
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            emails,
            subject,
            message,
            attachments: selectedDocs.map(file => file.id),
        };

        try {
            await axios.post(`http://localhost:8081/api/email/send-emailattach1/${id}`, formData);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email.');
        }
    };

    return (
        <div className="template d-flex align-items-center w-100 sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleSubmit}>
                    <h3>Authority Email</h3>
                    <div className="mb-3">
                        <div className="email-input-container" style={{ border: '1px solid #ced4da', padding: '5px', borderRadius: '4px' }}>
                            {emails.map((email, index) => (
                                <span key={index} className="email-tag" style={{ margin: '2px', padding: '5px', backgroundColor: '#f1f1f1', borderRadius: '3px', display: 'inline-flex', alignItems: 'center' }}>
                                    {email}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmail(email)}
                                        style={{
                                            marginLeft: '5px',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: 'red',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ',') {
                                        handleAddEmail(e);
                                    }
                                }}
                                className="email-input"
                                style={{ border: 'none', outline: 'none', flex: 1 }}
                                placeholder="Enter recipient email and press Enter"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="form-control"
                            placeholder="Enter email subject"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-control"
                            placeholder="Enter your message"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Select Documents (optional):</label>
                        <select
                            multiple
                            onChange={handleFileChange}
                            className="form-control"
                            style={{ height: '150px' }}
                        >
                            {resources.map(resource => (
                                <option key={resource.id} value={resource.id}>
                                    {resource.fileName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <h5>Selected Documents:</h5>
                        {selectedDocs.map(file => (
                            <div key={file.id} className="d-flex align-items-center mb-2">
                                <span className="me-2">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(file.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompEmail;
