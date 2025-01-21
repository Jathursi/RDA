// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function OutRegist() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [values, setValues] = useState({
//         Date: '',
//         Description: '',
//         Job_NO: '',
//         Supplier: "",
//         cost: '',
//         Authority: ''
//     });
//     const [sundries, setSundries] = useState([{ Sundries: '', Sun_cost: '' }]);

//     const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('values', JSON.stringify(values)); // Ensure values is an object
//     formData.append('sundries', JSON.stringify(sundries)); // Ensure sundries is an array
//     selectedFiles.forEach(file => formData.append('images', file));

//     try {
//         await axios.post(`http://localhost:8081/api/out/Outinsert/${id}`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         setIsSubmitted(true);
//         navigate('/Home'); // Redirect to home on success
//     } catch (error) {
//         console.error('Error creating outsource entry:', error);
//         alert('Failed to submit data. Please try again.');
//     }
// };


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setValues({ ...values, [name]: value });
//     };

//     const handleSundriesChange = (e, index) => {
//         const { name, value } = e.target;
//         const updatedSundries = [...sundries];
//         updatedSundries[index][name] = value;
//         setSundries(updatedSundries);
//     };

//     const handleAddMoreSundries = () => {
//         setSundries([...sundries, { Sundries: '', Sun_cost: '' }]);
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/'));
//         if (validFiles.length !== files.length) {
//             alert('Some files are invalid (too large or not an image).');
//         }
//         setSelectedFiles(validFiles);
//     };

//   return (
//     <div className='table-responsive mt-4 overflow-x-hidden z-index-1000'>
//                         <form onSubmit={handleSubmit}>
// <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Date:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 name="Date"
//                                 value={values.Date}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Description:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="Description"
//                                 value={values.Description}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Job_NO:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="Job_NO"
//                                 value={values.Job_NO}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Supplier:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="Supplier"
//                                 value={values.Supplier}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Cost:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="cost"
//                                 value={values.cost}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Authority:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="Authority"
//                                 value={values.Authority}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Image</label>
//                         <div className="col-sm-10">
//                             <input className="form-control" type="file" multiple onChange={handleFileChange} />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Sundries</label>
//                         <div className="col-sm-10">
//                             {sundries.map((sundry, index) => (
//                                 <div key={index} className="mb-3">
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="Sundries"
//                                         placeholder="Sundries"
//                                         value={sundry.Sundries}
//                                         onChange={(e) => handleSundriesChange(e, index)}
//                                     />
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="Sun_cost"
//                                         placeholder="Cost"
//                                         value={sundry.Sun_cost}
//                                         onChange={(e) => handleSundriesChange(e, index)}
//                                     />
//                                 </div>
//                             ))}
//                             <button type="button" className="btn btn-secondary" onClick={handleAddMoreSundries}>
//                                 Add More Sundries
//                             </button>
//                         </div>
//                     </div>
//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">
//                             {isSubmitted ? 'Update' : 'Submit'}
//                         </button>
//                     </div>
//                         </form>
//                     </div>
//   )
// }

// export default OutRegist

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OutRegist({ onClose, form, setForm, isEdit, setIsEdit, fetchOutsourceData }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [sundries, setSundries] = useState([{ Sundries: '', Sun_cost: '' }]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setIsFormChanged(true);
    };

    const handleSundriesChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSundries = [...sundries];
        updatedSundries[index][name] = value;
        setSundries(updatedSundries);
    };

    const handleAddMoreSundries = () => {
        setSundries([...sundries, { Sundries: '', Sun_cost: '' }]);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/'));
        if (validFiles.length !== files.length) {
            alert('Some files are invalid (too large or not an image).');
        }
        setSelectedFiles(validFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('values', JSON.stringify(form));
        formData.append('sundries', JSON.stringify(sundries));
        selectedFiles.forEach(file => formData.append('images', file));

        try {
            if (isEdit) {
                await axios.put(`http://localhost:8081/api/out/Outupdate/${form.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // alert('Outsource entry updated successfully');
                window.location.reload();
            } else {
                await axios.post(`http://localhost:8081/api/out/Outinsert/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // alert('Outsource entry created successfully');
                window.location.reload();
            }
            fetchOutsourceData();
            onClose();
        } catch (error) {
            console.error('Error creating/updating outsource entry:', error);
            alert('Failed to submit data. Please try again.');
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
        <div className='table-responsive mt-4 overflow-x-hidden z-index-1000'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Date:</label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            className="form-control"
                            name="Date"
                            value={form.Date}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Description:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="Description"
                            value={form.Description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Job_NO:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="Job_NO"
                            value={form.Job_NO}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Supplier:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="Supplier"
                            value={form.Supplier}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Cost:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="cost"
                            value={form.cost}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Authority:</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="Authority"
                            value={form.Authority}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" multiple onChange={handleFileChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Sundries</label>
                    <div className="col-sm-10">
                        {sundries.map((sundry, index) => (
                            <div key={index} className="mb-3">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="Sundries"
                                    placeholder="Sundries"
                                    value={sundry.Sundries}
                                    onChange={(e) => handleSundriesChange(e, index)}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Sun_cost"
                                    placeholder="Cost"
                                    value={sundry.Sun_cost}
                                    onChange={(e) => handleSundriesChange(e, index)}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={handleAddMoreSundries}>
                            Add More Sundries
                        </button>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OutRegist;