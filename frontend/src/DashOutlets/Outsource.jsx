// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function OutSource() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [values, setValues] = useState([{
//         Date: '',
//         Description: '',
//         Job_NO: '',
//         Supplier: "",
//         cost: '',
//         Authority: ''
//     }]);
//     const [sundries, setSundries] = useState([{
//         Sundries: '',
//         Sun_cost: ''
//     }]);


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const book_id = id;

//         const formData = new FormData();
//         formData.append('values', JSON.stringify(values));
//         formData.append('sundries', JSON.stringify(sundries));
//         selectedFiles.forEach(file => {
//             formData.append('images', file);
//         });
//             // Initial submission
//             axios.post(`http://localhost:8081/api/out/Outinsert/${book_id}`, formData)
//                 .then(res => {
//                     console.log("Logbook entries added successfully");
//                     setIsSubmitted(true); // Mark as submitted after successful post
//                     navigate('/Home');
//                 })
//                 .catch(err => {
//                     console.error('Error adding logbook entries:', err);
//                 });
        
//     };

//     const handleChange = (e, index) => {
//         const { name, value } = e.target;
//         const newValues = [...values];
//         newValues[index][name] = value;
//         setValues(newValues);
//     };

//     const handleSundriesChange = (e, index) => {
//         const { name, value } = e.target;
//         const newSundries = [...sundries];
//         newSundries[index][name] = value;
//         setSundries(newSundries);
//     };

//     const handleAddMore = () => {
//         setValues([...values, {
//             Date: '',
//             Description: '',
//             Job_NO: '',
//             Supplier: "",
//             cost: '',
//             Authority: ''
//         }]);
//     };

//     const handleAddMoreSundries = () => {
//         setSundries([...sundries, {
//             Sundries: '',
//             Sun_cost: ''
//         }]);
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const validFiles = files.filter(
//             (file) => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/')
//         );
//         if (validFiles.length !== files.length) {
//             alert('Some files are invalid (too large or not an image).');
//         }
//         setSelectedFiles(validFiles);
//     }

//     return (
//         <div className="template d-flex align-items-center 100-w sm:w-100">
//             <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//                 <form onSubmit={handleSubmit}>
//                     <h2 className="formTitle pb-2 sm:pb-5">Out Source</h2>
//                     <div className="mb-3 row">
//                         <label className="col-sm-2 col-form-label">Date:</label>
//                         <div className="col-sm-10">
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 name="Date"
//                                 value={values[0].Date}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                                 value={values[0].Description}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                                 value={values[0].Job_NO}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                                 value={values[0].Supplier}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                                 value={values[0].cost}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                                 value={values[0].Authority}
//                                 onChange={(e) => handleChange(e, 0)}
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
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default OutSource;

// import React, { useState , useEffect} from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { IoMdAdd } from "react-icons/io";
// import OutRegist from './OutRegist';

// function OutSource() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [selectedFiles, setSelectedFiles] = useState([]);
//         const [showRegist, setShowRegist] = useState(false);
    
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [values, setValues] = useState([]);
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
//     useEffect(() => {
//         axios
//             .get(`http://localhost:8081/api/out/Outview/${id}`, { withCredentials: true })
//             .then((response) => {
//                 const fetchedFields = response.data.map((field) => ({
//                     Description: field.Description,
//                     Date: field.Date,
//                     Job_NO: field.Job_NO,
//                     Supplier: field.Supplier,
//                     cost: field.cost,
//                     Authority: field.Authority
//                 }));
//                 setValues(fetchedFields);
//             })
//             .catch((err) => {
//                 // setError('An error occurred. Please try again.');
//                 console.error('Error fetching data:', err);
//             });
//     }, [id]);

//     return (
//         // <div className="template">
//         //     <form onSubmit={handleSubmit}>
//         //         <h2>Out Source</h2>
//         //         <input type="date" name="Date" value={values.Date} onChange={handleChange} placeholder="Date" />
//         //         <input type="text" name="Description" value={values.Description} onChange={handleChange} placeholder="Description" />
//         //         <input type="text" name="Job_NO" value={values.Job_NO} onChange={handleChange} placeholder="Job_NO" />
//         //         <input type="text" name="Supplier" value={values.Supplier} onChange={handleChange} placeholder="Supplier" />
//         //         <input type="text" name="cost" value={values.cost} onChange={handleChange} placeholder="Cost" />
//         //         <input type="text" name="Authority" value={values.Authority} onChange={handleChange} placeholder="Authority" />
//         //         <input type="file" multiple onChange={handleFileChange} />

//         //         {sundries.map((sundry, index) => (
//         //             <div key={index}>
//         //                 <input type="text" name="Sundries" value={sundry.Sundries} onChange={(e) => handleSundriesChange(e, index)} placeholder="Sundries" />
//         //                 <input type="text" name="Sun_cost" value={sundry.Sun_cost} onChange={(e) => handleSundriesChange(e, index)} placeholder="Cost" />
//         //             </div>
//         //         ))}
//         //         <button type="button" onClick={handleAddMoreSundries}>Add More Sundries</button>
//         //         <button type="submit">{isSubmitted ? 'Update' : 'Submit'}</button>
//         //     </form>
//         // </div>
//         // <div className="template d-flex align-items-center 100-w sm:w-100">
//         //     <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//         //         <form onSubmit={handleSubmit}>
//         //             <h3>Out Source</h3>
                    
//         //         </form>
//         //     </div>
//         // </div>
//         <div className="row">
//             <div className="col-md-12">
//             <div className="table-wrapper">
//                 <div className="table-title">
//                 <div className="row title-row">
//                     <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
//                     <h2 className="hid ml-lg-2 items-center">Outsource</h2>
//                     </div>
//                     <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
//                     <button
//                         className="btn btn-success flex items-center gap-3"
//                         onClick={() => setShowRegist(true)}
//                     >
//                         <IoMdAdd size={20} />
//                         Add Outsource
//                     </button>
//                     </div>
//                 </div>
//                 </div>
//                 <div>
//                     <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Title</th>
//                             <th>Content</th>
//                             <th>Date</th>
//                             <th>Date</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(values) && values.map((field, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{field.Date}</td>
//                                 <td>{field.Description}</td>
//                                 <td>{field.Job_NO}</td>
//                                 <td>{field.Supplier}</td>
//                                 <td>{field.cost}</td>
//                                 <td>{field.Authority}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 </div>
//                 </div>
//                 </div>
//             {showRegist && (
//               <div className="modal-overlay">
//                 <div className="modal-container">
//                     <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
//                     <OutRegist onClose={() => setShowRegist(false)} />
//                 </div>
//               </div>
//             )}
//     </div>
//     );
// }

// export default OutSource;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import OutRegist from './OutRegist';

function OutSource() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        Date: '',
        Description: '',
        Job_NO: '',
        Supplier: '',
        cost: '',
        Authority: ''
    });
    const [sundries, setSundries] = useState([{ Sundries: '', Sun_cost: '' }]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [showRegist, setShowRegist] = useState(false);

    useEffect(() => {
        fetchOutsourceData();
    }, [id]);

    const fetchOutsourceData = () => {
    axios.get(`http://localhost:8081/api/out/Outview/${id}`, { withCredentials: true })
        .then(response => {
            const fetchedFields = response.data.outsourceEntries.map((field) => ({
                id: field.id,
                Date: new Date(field.Date).toISOString().split('T')[0], // Format date
                Description: field.Description,
                Job_NO: field.Job_NO,
                Supplier: field.Supplier,
                cost: field.cost,
                Authority: field.Authority
            }));
            setData(fetchedFields);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};


    const handleEdit = (field) => {
        setForm({
            id: field.id,
            Date: field.Date,
            Description: field.Description,
            Job_NO: field.Job_NO,
            Supplier: field.Supplier,
            cost: field.cost,
            Authority: field.Authority
        });
        setIsEdit(true);
        setShowRegist(true);
    };

    const handleClose = () => {
        setShowRegist(false);
        setIsEdit(false);
        setForm({
            Date: '',
            Description: '',
            Job_NO: '',
            Supplier: '',
            cost: '',
            Authority: ''
        });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row title-row">
                            <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
                                <h2 className="hid ml-lg-2 items-center">Outsource</h2>
                            </div>
                            <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                                <button
                                    className="btn btn-success flex items-center gap-3"
                                    onClick={() => setShowRegist(true)}
                                >
                                    <IoMdAdd size={20} />
                                    Add Outsource
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Job_NO</th>
                                    <th>Supplier</th>
                                    <th>Cost</th>
                                    <th>Authority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((field, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{field.Date}</td>
                                        <td>{field.Description}</td>
                                        <td>{field.Job_NO}</td>
                                        <td>{field.Supplier}</td>
                                        <td>{field.cost}</td>
                                        <td>{field.Authority}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(field)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showRegist && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={handleClose}>X</button>
                        <OutRegist
                            onClose={handleClose}
                            form={form}
                            setForm={setForm}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            fetchOutsourceData={fetchOutsourceData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OutSource;