// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './dashout.css';

// function UserInfo() {
//     const { id } = useParams();
//     const book_id = id;
//     const [data, setData] = useState([]);
//     const [form, setForm] = useState({ id: null, title: '', content: '' }); // Add `id` to track updates
//     const [isEdit, setIsEdit] = useState(false); // Track edit mode

//     // Fetch data /use/:book_id
//     useEffect(() => {
//         fetchUserInfo();
//     }, [book_id]);

//     const fetchUserInfo = () => {
//         axios.get(`http://localhost:8081/api/userinf/use/${book_id}`)
//             .then(response => {
//                 console.log('Fetched Data:', response.data);
//                 const fetchedFields = response.data.map((field) => ({
//                     id: field.id, // Include ID for update tracking
//                     title: field.title,
//                     content: field.content,
//                     createdAt: field.createdAt
//                         ? new Date(field.createdAt).toLocaleDateString()
//                         : 'N/A'
//                 }));
//                 setData(fetchedFields);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the data!', error);
//             });
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleEdit = (field) => {
//         setForm({ id: field.id, title: field.title, content: field.content }); // Populate the form
//         setIsEdit(true);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (isEdit) {
//             // Update existing record
//             axios.put(`http://localhost:8081/api/userinf/update/${form.id}`, {
//                 title: form.title,
//                 content: form.content
//             })
//                 .then(response => {
//                     console.log('Update Response:', response.data);
//                     alert('User information updated successfully');
//                     setIsEdit(false);
//                     setForm({ id: null, title: '', content: '' });
//                     fetchUserInfo();
//                 })
//                 .catch(error => {
//                     console.error('There was an error updating the data!', error);
//                 });
//         } else {
//             // Create new record
//             axios.post(`http://localhost:8081/api/userinf/insert/${book_id}`, {
//                 title: form.title,
//                 content: form.content
//             })
//                 .then(response => {
//                     console.log('Submission Response:', response.data);
//                     alert('User information submitted successfully');
//                     setForm({ id: null, title: '', content: '' });
//                     fetchUserInfo();
//                 })
//                 .catch(error => {
//                     console.error('There was an error submitting the data!', error);
//                 });
//         }
//     };

//     return (
//         <div className="template d-flex align-items-center 100-w sm:w-100">
//             <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//                 <form onSubmit={handleSubmit}>
//                     <h2 className="formTitle pb-2 sm:pb-5">{isEdit ? 'Edit User Information' : 'Add User Information'}</h2>
//                     <div className="mb-3 row">
//                         <label className="col-sm-3 col-form-label">Physical Progress:</label>
//                         <div className="col-sm-9">
//                             <textarea
//                                 type="text"
//                                 className="form-control"
//                                 name="title"
//                                 rows={4}
//                                 placeholder="Enter title"
//                                 value={form.title}
//                                 onChange={handleInputChange}
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-3 col-form-label">Financial Progress:</label>
//                         <div className="col-sm-9">
//                             <textarea
//                                 type="text"
//                                 className="form-control"
//                                 name="content"
//                                 rows={4}
//                                 placeholder="Enter content"
//                                 value={form.content}
//                                 onChange={handleInputChange}
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="d-grid mb-4">
//                         <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
//                     </div>
//                 </form>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Title</th>
//                             <th>Content</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((field, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{field.title}</td>
//                                 <td>{field.content}</td>
//                                 <td>{field.createdAt}</td>
//                                 <td>
//                                     <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(field)}>Edit</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default UserInfo;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './dashout.css';

function UserInfo() {
    const { id } = useParams();
    const book_id = id;
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', content: '' }); // Form state with ID for editing
    const [isEdit, setIsEdit] = useState(false); // Track edit mode

    // Fetch data /use/:book_id
    useEffect(() => {
        fetchUserInfo();
    }, [book_id]);

    const fetchUserInfo = () => {
        axios.get(`http://localhost:8081/api/userinf/use/${book_id}`)
            .then(response => {
                console.log('Fetched Data:', response.data);
                const fetchedFields = response.data.map((field) => ({
                    id: field.id,
                    title: field.title,
                    content: field.content,
                    createdAt: field.createdAt
                        ? new Date(field.createdAt).toLocaleDateString()
                        : 'N/A'
                }));
                setData(fetchedFields);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleEdit = (field) => {
        setForm({ id: field.id, title: field.title, content: field.content }); // Populate form for editing
        setIsEdit(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEdit) {
            // Update existing record
            axios.put(`http://localhost:8081/api/userinf/update/${book_id}`, {
                title: form.title,
                content: form.content
            })
                .then(response => {
                    console.log('Update Response:', response.data);
                    alert('User information updated successfully');
                    setIsEdit(false);
                    setForm({ id: null, title: '', content: '' });
                    fetchUserInfo();
                })
                .catch(error => {
                    console.error('There was an error updating the data!', error);
                });
        } else {
            // Create new record
            axios.post(`http://localhost:8081/api/userinf/insert/${book_id}`, {
                title: form.title,
                content: form.content
            })
                .then(response => {
                    console.log('Submission Response:', response.data);
                    alert('User information submitted successfully');
                    setForm({ id: null, title: '', content: '' });
                    fetchUserInfo();
                })
                .catch(error => {
                    console.error('There was an error submitting the data!', error);
                });
        }
    };

    return (
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleSubmit}>
                    <h2 className="formTitle pb-2 sm:pb-5">{isEdit ? 'Edit User Information' : 'Add User Information'}</h2>
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Physical Progress:</label>
                        <div className="col-sm-9">
                            <textarea
                                type="text"
                                className="form-control"
                                name="title"
                                rows={4}
                                placeholder="Enter progress"
                                value={form.title}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Financial Progress:</label>
                        <div className="col-sm-9">
                            <textarea
                                type="text"
                                className="form-control"
                                name="content"
                                rows={4}
                                placeholder="Enter progress"
                                value={form.content}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
                    </div>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((field, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{field.title}</td>
                                <td>{field.content}</td>
                                <td>{field.createdAt}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(field)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserInfo;
