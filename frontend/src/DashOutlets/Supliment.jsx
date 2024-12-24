import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SupNav from '../SupCat/SupNav';

function Supliment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({ No: '', Date: '', Estimated: '', supplimentID: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isInitialSubmission, setIsInitialSubmission] = useState(true);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(
            (file) => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/')
        );
        if (validFiles.length !== files.length) {
            alert('Some files are invalid (too large or not an image).');
        }
        setSelectedFiles(validFiles);
    };

    useEffect(() => {
        const fetchEstimate = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:8081/api/sup/Supselect/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status !== 200) {
                    throw new Error(`Error fetching estimate: ${response.statusText}`);
                }

                const {No, Date, Estimated } = response.data.suppliment; // Ensure this matches the response structure
                const formattedDate = Date.split('T')[0]; // Split at "T" and take the first part
                setValues({ supplimentID: id, No, Date : formattedDate, Estimated });
                setIsInitialSubmission(false); // Switch to update mode
            } catch (error) {
                console.error('Error fetching estimate:', error);
                alert(error.message);
            }
        };

        fetchEstimate();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        selectedFiles.forEach((file) => formData.append('images', file));

        const token = localStorage.getItem('token');
        const url = isInitialSubmission
            ? `http://localhost:8081/api/sup/Supinsert/${id}`
            : `http://localhost:8081/api/sup/Supupdate/${id}`;
        const method = isInitialSubmission ? 'post' : 'put';

        try {
            await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(
                isInitialSubmission
                    ? 'Estimate created successfully'
                    : 'Estimate updated successfully'
            );
            navigate('/home');
        } catch (err) {
            console.error('Error submitting estimation:', err.response?.data || err.message);
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="template d-flex align-items-center 100-w  sm:w-100 ">
        <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
            <h3>Suppliment</h3>
            <form className='mt-4'  onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Estimate No:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            name="No"
                            value={values.No}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Date:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="date"
                            name="Date"
                            value={values.Date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Estimated by:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            name="Estimated"
                            value={values.Estimated}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Condition of vehicle:</label>
                    <div className="col-sm-10">
                        <input type="file" multiple onChange={handleFileChange} />
                    </div>
                </div>
                <div className='d-grid'>
                    <button className='btn btn-primary' type="submit">{isInitialSubmission ? 'Submit' : 'Update'}</button>
                </div>
            </form>
            <SupNav />
            {/* {values.supplimentID && <SupMat values={{ supplimentID: values.supplimentID }} />}
            {values.supplimentID && <SupMac values={{ supplimentID: values.supplimentID }} />}
            {values.supplimentID && <SupTrans values={{ supplimentID: values.supplimentID }} />}
            {values.supplimentID && <SupWel values={{ supplimentID: values.supplimentID }} />}
            {values.supplimentID && <SupSun values={{ supplimentID: values.supplimentID }} />}
            {values.supplimentID && <SupLab values={{ supplimentID: values.supplimentID }} />} */}
        </div>
        </div>
    );
}

export default Supliment;

// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import SupMac from '../SupCat/SupMac';
// import SupLab from '../SupCat/SupLab';
// import SupTrans from '../SupCat/SupTrans';
// import SupWel from '../SupCat/SupWel';
// import SupSun from '../SupCat/SupSun';
// import SupMat from '../SupCat/SupMat';

// function Supliment() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [values, setValues] = useState({ No: '', Date: '', Estimated: '', supplimentID: '' });
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [isInitialSubmission, setIsInitialSubmission] = useState(true);
//     const [supplimentList, setSupplimentList] = useState([]);

//     const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
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
//     };

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/Supselect/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }

//                 const { Date, Estimated, No } = response.data.suppliment; // Ensure this matches the response structure
//                 setValues({ supplimentID: id, Date, Estimated, No });
//                 setIsInitialSubmission(false); // Switch to update mode
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         const fetchSupplimentList = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/fetchAllCategories/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching suppliment list: ${response.statusText}`);
//                 }

//                 setSupplimentList(response.data);
//             } catch (error) {
//                 console.error('Error fetching suppliment list:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//         fetchSupplimentList();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         Object.keys(values).forEach((key) => {
//             formData.append(key, values[key]);
//         });
//         selectedFiles.forEach((file) => formData.append('images', file));

//         const token = localStorage.getItem('token');
//         const url = isInitialSubmission
//             ? `http://localhost:8081/api/sup/Supinsert/${id}`
//             : `http://localhost:8081/api/sup/Supupdate/${id}`;
//         const method = isInitialSubmission ? 'post' : 'put';

//         try {
//             await axios({
//                 method,
//                 url,
//                 data: formData,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(
//                 isInitialSubmission
//                     ? 'Estimate created successfully'
//                     : 'Estimate updated successfully'
//             );
//             navigate('/home');
//         } catch (err) {
//             console.error('Error submitting estimation:', err.response?.data || err.message);
//             alert(err.response?.data?.error || err.message);
//         }
//     };

//     const handleAddNewSuppliment = () => {
//         setValues({ No: '', Date: '', Estimated: '', supplimentID: '' });
//         setSelectedFiles([]);
//         setIsInitialSubmission(true);
//     };

//     const handleViewSuppliment = (supplimentID) => {
//         navigate(`/suppliment/${supplimentID}`);
//     };

//     return (
//         <div className="formContainer-imp">
//             <form className="form" onSubmit={handleSubmit}>
//                 <div className="formTitle">Suppliment Estimation</div>
//                 <div className="formGroup">
//                     <label className="label">Estimate No:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="No"
//                         value={values.No}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Date:</label>
//                     <input
//                         className="input"
//                         type="date"
//                         name="Date"
//                         value={values.Date}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Estimated by:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="Estimated"
//                         value={values.Estimated}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Quotation Images:</label>
//                     <input type="file" multiple onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">{isInitialSubmission ? 'Submit' : 'Update'}</button>
//             </form>
//             {values.supplimentID && <SupMat values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupMac values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupTrans values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupWel values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupSun values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupLab values={{ supplimentID: values.supplimentID }} />}
//             <div className="navigationButtons">
//                 <button onClick={handleAddNewSuppliment}>Add New Suppliment</button>
//                 {supplimentList.map((suppliment) => (
//                     <button key={suppliment.id} onClick={() => handleViewSuppliment(suppliment.id)}>
//                         View Suppliment {suppliment.No}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Supliment;


// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import SupMac from '../SupCat/SupMac';
// import SupLab from '../SupCat/SupLab';
// import SupTrans from '../SupCat/SupTrans';
// import SupWel from '../SupCat/SupWel';
// import SupSun from '../SupCat/SupSun';
// import SupMat from '../SupCat/SupMat';

// function Supliment() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [values, setValues] = useState({ No: '', Date: '', Estimated: '', supplimentID: '' });
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [isInitialSubmission, setIsInitialSubmission] = useState(true);
//     const [supplimentList, setSupplimentList] = useState([]);

//     const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
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
//     };

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/Supselect/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }

//                 const { Date, Estimated, No } = response.data.suppliment; // Ensure this matches the response structure
//                 setValues({ supplimentID: id, Date, Estimated, No });
//                 setIsInitialSubmission(false); // Switch to update mode
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         const fetchSupplimentList = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/fetchAllCategories/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching suppliment list: ${response.statusText}`);
//                 }

//                 setSupplimentList(response.data);
//             } catch (error) {
//                 console.error('Error fetching suppliment list:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//         fetchSupplimentList();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         Object.keys(values).forEach((key) => {
//             formData.append(key, values[key]);
//         });
//         selectedFiles.forEach((file) => formData.append('images', file));

//         const token = localStorage.getItem('token');
//         const url = isInitialSubmission
//             ? `http://localhost:8081/api/sup/Supinsert/${id}`
//             : `http://localhost:8081/api/sup/Supupdate/${id}`;
//         const method = isInitialSubmission ? 'post' : 'put';

//         try {
//             await axios({
//                 method,
//                 url,
//                 data: formData,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(
//                 isInitialSubmission
//                     ? 'Estimate created successfully'
//                     : 'Estimate updated successfully'
//             );
//             navigate('/home');
//         } catch (err) {
//             console.error('Error submitting estimation:', err.response?.data || err.message);
//             alert(err.response?.data?.error || err.message);
//         }
//     };

//     const handleAddNewSuppliment = () => {
//         setValues({ No: '', Date: '', Estimated: '', supplimentID: '' });
//         setSelectedFiles([]);
//         setIsInitialSubmission(true);
//     };

//     const handleViewSuppliment = (supplimentID) => {
//         navigate(`/suppliment/${supplimentID}`);
//     };

//     const handlePreviousSuppliment = () => {
//         const currentIndex = supplimentList.findIndex(suppliment => suppliment.id === parseInt(id));
//         if (currentIndex > 0) {
//             const previousSupplimentID = supplimentList[currentIndex - 1].id;
//             navigate(`/suppliment/${previousSupplimentID}`);
//         }
//     };

//     const handleNextSuppliment = () => {
//         const currentIndex = supplimentList.findIndex(suppliment => suppliment.id === parseInt(id));
//         if (currentIndex < supplimentList.length - 1) {
//             const nextSupplimentID = supplimentList[currentIndex + 1].id;
//             navigate(`/suppliment/${nextSupplimentID}`);
//         }
//     };

//     return (
//         <div className="formContainer-imp">
//             <form className="form" onSubmit={handleSubmit}>
//                 <div className="formTitle">Suppliment Estimation</div>
//                 <div className="formGroup">
//                     <label className="label">Estimate No:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="No"
//                         value={values.No}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Date:</label>
//                     <input
//                         className="input"
//                         type="date"
//                         name="Date"
//                         value={values.Date}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Estimated by:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="Estimated"
//                         value={values.Estimated}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Quotation Images:</label>
//                     <input type="file" multiple onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">{isInitialSubmission ? 'Submit' : 'Update'}</button>
//             </form>
//             {values.supplimentID && <SupMat values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupMac values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupTrans values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupWel values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupSun values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupLab values={{ supplimentID: values.supplimentID }} />}
//             <div className="navigationButtons">
//                 <button onClick={handleAddNewSuppliment}>Add New Suppliment</button>
//                 <button onClick={handlePreviousSuppliment} disabled={supplimentList.findIndex(suppliment => suppliment.id === parseInt(id)) === 0}>Previous</button>
//                 <button onClick={handleNextSuppliment} disabled={supplimentList.findIndex(suppliment => suppliment.id === parseInt(id)) === supplimentList.length - 1}>Next</button>
//                 {supplimentList.map((suppliment) => (
//                     <button key={suppliment.id} onClick={() => handleViewSuppliment(suppliment.id)}>
//                         View Suppliment {suppliment.No}
//                     </button>
//                 ))}
//             </div>
            
//         </div>
//     );
// }

// export default Supliment;

// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import SupMac from '../SupCat/SupMac';
// import SupLab from '../SupCat/SupLab';
// import SupTrans from '../SupCat/SupTrans';
// import SupWel from '../SupCat/SupWel';
// import SupSun from '../SupCat/SupSun';
// import SupMat from '../SupCat/SupMat';

// function Supliment() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [values, setValues] = useState({ No: '', Date: '', Estimated: '', supplimentID: '' });
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [isInitialSubmission, setIsInitialSubmission] = useState(true);
//     const [supplimentList, setSupplimentList] = useState([]);

//     const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
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
//     };

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/Supselect/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }

//                 const { Date, Estimated, No } = response.data.suppliment; // Ensure this matches the response structure
//                 setValues({ supplimentID: id, Date, Estimated, No });
//                 setIsInitialSubmission(false); // Switch to update mode
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         const fetchSupplimentList = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/sup/fetchAllCategories/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching suppliment list: ${response.statusText}`);
//                 }

//                 setSupplimentList(response.data);
//             } catch (error) {
//                 console.error('Error fetching suppliment list:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//         fetchSupplimentList();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         Object.keys(values).forEach((key) => {
//             formData.append(key, values[key]);
//         });
//         selectedFiles.forEach((file) => formData.append('images', file));

//         const token = localStorage.getItem('token');
//         const url = isInitialSubmission
//             ? `http://localhost:8081/api/sup/Supinsert/${id}`
//             : `http://localhost:8081/api/sup/Supupdate/${id}`;
//         const method = isInitialSubmission ? 'post' : 'put';

//         try {
//             await axios({
//                 method,
//                 url,
//                 data: formData,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(
//                 isInitialSubmission
//                     ? 'Estimate created successfully'
//                     : 'Estimate updated successfully'
//             );
//             navigate('/home');
//         } catch (err) {
//             console.error('Error submitting estimation:', err.response?.data || err.message);
//             alert(err.response?.data?.error || err.message);
//         }
//     };

//     const handleAddNewSuppliment = () => {
//         setValues({ No: '', Date: '', Estimated: '', supplimentID: '' });
//         setSelectedFiles([]);
//         setIsInitialSubmission(true);
//     };

//     const handleViewSuppliment = (supplimentID) => {
//         navigate(`/suppliment/${supplimentID}`);
//     };

//     const handlePreviousSuppliment = () => {
//         const currentIndex = supplimentList.findIndex(suppliment => suppliment.id === parseInt(id));
//         if (currentIndex > 0) {
//             const previousSupplimentID = supplimentList[currentIndex - 1].id;
//             navigate(`/suppliment/${previousSupplimentID}`);
//         }
//     };

//     const handleNextSuppliment = () => {
//         const currentIndex = supplimentList.findIndex(suppliment => suppliment.id === parseInt(id));
//         if (currentIndex < supplimentList.length - 1) {
//             const nextSupplimentID = supplimentList[currentIndex + 1].id;
//             navigate(`/suppliment/${nextSupplimentID}`);
//         }
//     };

//     return (
//         <div className="formContainer-imp">
//             <form className="form" onSubmit={handleSubmit}>
//                 <div className="formTitle">Suppliment Estimation</div>
//                 <div className="formGroup">
//                     <label className="label">Estimate No:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="No"
//                         value={values.No}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Date:</label>
//                     <input
//                         className="input"
//                         type="date"
//                         name="Date"
//                         value={values.Date}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Estimated by:</label>
//                     <input
//                         className="input"
//                         type="text"
//                         name="Estimated"
//                         value={values.Estimated}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="formGroup">
//                     <label className="label">Quotation Images:</label>
//                     <input type="file" multiple onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">{isInitialSubmission ? 'Submit' : 'Update'}</button>
//             </form>
//             {values.supplimentID && <SupMat values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupMac values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupTrans values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupWel values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupSun values={{ supplimentID: values.supplimentID }} />}
//             {values.supplimentID && <SupLab values={{ supplimentID: values.supplimentID }} />}
//             <div className="navigationButtons">
//                 <button onClick={handleAddNewSuppliment}>Add New Suppliment</button>
//                 <button onClick={handlePreviousSuppliment} disabled={supplimentList.findIndex(suppliment => suppliment.id === parseInt(id)) === 0}>Previous</button>
//                 <button onClick={handleNextSuppliment} disabled={supplimentList.findIndex(suppliment => suppliment.id === parseInt(id)) === supplimentList.length - 1}>Next</button>
//                 {supplimentList.map((suppliment) => (
//                     <button key={suppliment.id} onClick={() => handleViewSuppliment(suppliment.id)}>
//                         View Suppliment {suppliment.No}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Supliment;