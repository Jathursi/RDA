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

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OutSource() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState({
        Date: '',
        Description: '',
        Job_NO: '',
        Supplier: "",
        cost: '',
        Authority: ''
    });
    const [sundries, setSundries] = useState([{ Sundries: '', Sun_cost: '' }]);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('values', JSON.stringify(values)); // Ensure values is an object
    formData.append('sundries', JSON.stringify(sundries)); // Ensure sundries is an array
    selectedFiles.forEach(file => formData.append('images', file));

    try {
        await axios.post(`http://localhost:8081/api/out/Outinsert/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setIsSubmitted(true);
        navigate('/Home'); // Redirect to home on success
    } catch (error) {
        console.error('Error creating outsource entry:', error);
        alert('Failed to submit data. Please try again.');
    }
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
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

    return (
        <div className="template">
            <form onSubmit={handleSubmit}>
                <h2>Out Source</h2>
                <input type="date" name="Date" value={values.Date} onChange={handleChange} placeholder="Date" />
                <input type="text" name="Description" value={values.Description} onChange={handleChange} placeholder="Description" />
                <input type="text" name="Job_NO" value={values.Job_NO} onChange={handleChange} placeholder="Job_NO" />
                <input type="text" name="Supplier" value={values.Supplier} onChange={handleChange} placeholder="Supplier" />
                <input type="text" name="cost" value={values.cost} onChange={handleChange} placeholder="Cost" />
                <input type="text" name="Authority" value={values.Authority} onChange={handleChange} placeholder="Authority" />
                <input type="file" multiple onChange={handleFileChange} />

                {sundries.map((sundry, index) => (
                    <div key={index}>
                        <input type="text" name="Sundries" value={sundry.Sundries} onChange={(e) => handleSundriesChange(e, index)} placeholder="Sundries" />
                        <input type="text" name="Sun_cost" value={sundry.Sun_cost} onChange={(e) => handleSundriesChange(e, index)} placeholder="Cost" />
                    </div>
                ))}
                <button type="button" onClick={handleAddMoreSundries}>Add More Sundries</button>
                <button type="submit">{isSubmitted ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
}

export default OutSource;
