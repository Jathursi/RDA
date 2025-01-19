// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './dashout.css';
// import { IoMdAdd } from "react-icons/io";
// // import UserRegist from './UserRegist';

// function UserRegist({ onClose }) {
//     const { id } = useParams();
//     const book_id = id;
//     const [data, setData] = useState([]);
//     const [form, setForm] = useState({ id: null, title: '', content: '' }); // Form state with ID for editing
//     const [isEdit, setIsEdit] = useState(false); // Track edit mode
//     const [showRegist, setShowRegist] = useState(false);
//     const [isFormChanged, setIsFormChanged] = useState(false);

//     // Fetch data /use/:book_id
//     useEffect(() => {
//         fetchUserInfo();
//     }, [book_id]);

//     const fetchUserInfo = () => {
//         axios.get(`http://localhost:8081/api/userinf/use/${book_id}`)
//             .then(response => {
//                 console.log('Fetched Data:', response.data);
//                 const fetchedFields = response.data.map((field) => ({
//                     id: field.id,
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
//         setIsFormChanged(true);
//     };

//     const handleEdit = (field) => {
//         setForm({ id: field.id, title: field.title, content: field.content }); // Populate form for editing
//         setIsEdit(true);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (isEdit) {
//             // Update existing record
//             axios.put(`http://localhost:8081/api/userinf/update/${book_id}`, {
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
//     const handleClose = () => {
//         if (isFormChanged) {
//             const confirmLeave = window.confirm('You have unsaved changes. Do you really want to leave?');
//             if (confirmLeave) {
//                 onClose();
//             }
//         } else {
//             onClose();
//         }
//     };
//   return (
//     <div className="template d-flex align-items-center 100-w sm:w-100">
//                 <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//                     <form onSubmit={handleSubmit}>
//                         <h2 className="formTitle pb-2 sm:pb-5">{isEdit ? 'Edit User Information' : 'Add User Information'}</h2>
//                         <div className="mb-3 row">
//                             <label className="col-sm-3 col-form-label">Physical Progress:</label>
//                             <div className="col-sm-9">
//                                 <textarea
//                                     type="text"
//                                     className="form-control"
//                                     name="title"
//                                     rows={4}
//                                     placeholder="Enter progress"
//                                     value={form.title}
//                                     onChange={handleInputChange}
//                                 ></textarea>
//                             </div>
//                         </div>
//                         <div className="mb-3 row">
//                             <label className="col-sm-3 col-form-label">Financial Progress:</label>
//                             <div className="col-sm-9">
//                                 <textarea
//                                     type="text"
//                                     className="form-control"
//                                     name="content"
//                                     rows={4}
//                                     placeholder="Enter progress"
//                                     value={form.content}
//                                     onChange={handleInputChange}
//                                 ></textarea>
//                             </div>
//                         </div>
//                         <div className="d-grid mb-4">
//                             <button type="button" className="btn btn-secondary col-6" onClick={handleClose}>
//                                 cancel
//                             </button>
//                             <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//   )
// }

// export default UserRegist

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './dashout.css';

function UserRegist({ onClose, form, setForm, isEdit, setIsEdit, fetchUserInfo }) {
    const { id } = useParams();
    const book_id = id;
    const [isFormChanged, setIsFormChanged] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setIsFormChanged(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEdit) {
            // Update existing record
            axios.put(`http://localhost:8081/api/userinf/update/${form.id}`, {
                title: form.title,
                content: form.content
            })
                .then(response => {
                    console.log('Update Response:', response.data);
                    alert('User information updated successfully');
                    setIsEdit(false);
                    setForm({ id: null, title: '', content: '' });
                    fetchUserInfo();
                    onClose();
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
                    onClose();
                })
                .catch(error => {
                    console.error('There was an error submitting the data!', error);
                });
        }
    };

    const handleClose = () => {
        if (isFormChanged) {
            const confirmLeave = window.confirm('You have unsaved changes. Do you really want to leave?');
            if (confirmLeave) {
                onClose();
            }
        } else {
            onClose();
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
                        <button type="button" className="btn btn-secondary col-6" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserRegist;