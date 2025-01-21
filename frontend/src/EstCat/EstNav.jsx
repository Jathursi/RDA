// // import React, { useEffect, useState } from 'react';
// // import EstMat from './EstMat';
// // import EstLab from './EstLab';
// // import EstMac from './EstMac';
// // import EstTran from './EstTran';
// // import EstWel from './EstWel';
// // import EstSun from './EstSun';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // function EstNav({ estimateId, onClose }) {
// //     const { id } = useParams();
// //     // alert('Estimate ID:', id);
// //     const [values, setValues] = useState({}); // Initialize with an empty object

// //     useEffect(() => {
// //         const fetchEstimate = async () => {
// //             try {
// //                 const token = localStorage.getItem('token');
// //                 if (!token) {
// //                     throw new Error('No token found');
// //                 }

// //                 const response = await axios.get(`http://localhost:8081/api/est/est/${id}`, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });

// //                 if (response.status !== 200) {
// //                     throw new Error(`Error fetching estimate: ${response.statusText}`);
// //                 }
// //                 const { id: EstID, Date, Estimated } = response.data.estimate;
                
// //                 // Set values with the data fetched
// //                 setValues({  EstID, Date, Estimated });
// //                 console.log('Estimate Data:', response.data.EstID);
// //             } catch (error) {
// //                 console.error('Error fetching estimate:', error);
// //                 alert(error.message);
// //             }
// //         };

// //         fetchEstimate();
// //     }, [id]);

// //     // const handleClose = () => {
// //     //     if (isFormChanged) {
// //     //         const confirmLeave = window.confirm('You have unsaved changes. Do you really want to leave?');
// //     //         if (confirmLeave) {
// //     //             onClose();
// //     //         }
// //     //     } else {
// //     //         onClose();
// //     //     }
// //     // };
// //     return (
// //         <div className='container-fluid mt-5'>
// //             <ul className="nav nav-tabs" id="myTab" role="tablist">
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link active"
// //                         id="Material-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Material"
// //                         type="button"
// //                         role="tab"
// //                         aria-controls="home"
// //                         aria-selected="true"
// //                     >
// //                         Material {values.EstID}
// //                     </button>
// //                 </li>
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link"
// //                         id="Labours-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Labours"
// //                         type="button"
// //                         role="tab"
// //                         aria-controls="Labours"
// //                         aria-selected="false"
// //                     >
// //                         Labours
// //                     </button>
// //                 </li>
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link"
// //                         id="Machinery-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Machinery"
// //                         type="button"
// //                         role="tab"
// //                         aria-controls="Machinery"
// //                         aria-selected="false"
// //                     >
// //                         Machinery
// //                     </button>
// //                 </li>
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link"
// //                         id="Transport-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Transport"
// //                         type="button"
// //                         role="tab"
// //                         aria-controls="Transport"
// //                         aria-selected="false"
// //                     >
// //                         Transport
// //                     </button>
// //                 </li>
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link"
// //                         id="Welding-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Welding"
// //                         type="button"
// //                         role="tab"
// //                         aria-controls="Welding"
// //                         aria-selected="false"
// //                     >
// //                         Welding
// //                     </button>
// //                 </li>
// //                 <li className="nav-item" role="presentation">
// //                     <button
// //                         className="nav-link"
// //                         id="Sundries-tab"
// //                         data-bs-toggle="tab"
// //                         data-bs-target="#Sundries"
// //                         type="Sundries"
// //                         role="tab"
// //                         aria-controls="Sundries"
// //                         aria-selected="false"
// //                     >
// //                         Sundries
// //                     </button>
// //                 </li>
// //             </ul>
// //             <div className="tab-content" id="myTabContent">
// //                 <div
// //                     className="tab-pane fade show active"
// //                     id="Material"
// //                     role="tabpanel"
// //                     aria-labelledby="Material-tab"
// //                 >
// //                     {values.EstID && <EstMat values={{ EstID: values.EstID }} />}
// //                 </div>
// //                 <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
// //                     {values.EstID && <EstLab values={{ EstID: values.EstID }} />}
// //                 </div>
// //                 <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
// //                     {values.EstID && <EstMac values={{ EstID: values.EstID }} />}
// //                 </div>
// //                 <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
// //                     {values.EstID && <EstTran values={{ EstID: values.EstID }} />}
// //                 </div>
// //                 <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
// //                     {values.EstID && <EstWel values={{ EstID: values.EstID }} />}
// //                 </div>
// //                 <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
// //                     {values.EstID && <EstSun values={{ EstID: values.EstID }} />}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default EstNav;

// import React, { useEffect, useState } from 'react';
// import EstMat from './EstMat';
// import EstLab from './EstLab';
// import EstMac from './EstMac';
// import EstTran from './EstTran';
// import EstWel from './EstWel';
// import EstSun from './EstSun';
// import axios from 'axios';

// function EstNav({ estimateId, onClose }) {
//     const [values, setValues] = useState({}); // Initialize with an empty object

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/est/est/${estimateId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }
//                 const { id: EstID, Date, Estimated } = response.data.estimate;
                
//                 // Set values with the data fetched
//                 setValues({ EstID, Date, Estimated });
//                 console.log('Estimate Data:', response.data.estimate);
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//     }, [estimateId]);
//     const handleClose = () => {
//             onClose();
//     };
//     return (
//         <div className='container-fluid'>
//         <div className='d-flex justify-content-end'>
//             <button type="button" className="btn btn-danger" onClick={handleClose}>
//                 X
//             </button>
//         </div>
//             <ul className="nav nav-tabs" id="myTab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link active"
//                         id="Material-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Material"
//                         type="button"
//                         role="tab"
//                         aria-controls="home"
//                         aria-selected="true"
//                     >
//                         Material {values.EstID}
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Labours-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Labours"
//                         type="button"
//                         role="tab"
//                         aria-controls="Labours"
//                         aria-selected="false"
//                     >
//                         Labours
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Machinery-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Machinery"
//                         type="button"
//                         role="tab"
//                         aria-controls="Machinery"
//                         aria-selected="false"
//                     >
//                         Machinery
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Transport-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Transport"
//                         type="button"
//                         role="tab"
//                         aria-controls="Transport"
//                         aria-selected="false"
//                     >
//                         Transport
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Welding-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Welding"
//                         type="button"
//                         role="tab"
//                         aria-controls="Welding"
//                         aria-selected="false"
//                     >
//                         Welding
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Sundries-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Sundries"
//                         type="Sundries"
//                         role="tab"
//                         aria-controls="Sundries"
//                         aria-selected="false"
//                     >
//                         Sundries
//                     </button>
//                 </li>
//             </ul>
//             <div className="tab-content" id="myTabContent">
//                 <div
//                     className="tab-pane fade show active"
//                     id="Material"
//                     role="tabpanel"
//                     aria-labelledby="Material-tab"
//                 >
//                     {values.EstID && <EstMat values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
//                     {values.EstID && <EstLab values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
//                     {values.EstID && <EstMac values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
//                     {values.EstID && <EstTran values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
//                     {values.EstID && <EstWel values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
//                     {values.EstID && <EstSun values={{ EstID: values.EstID }} />}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EstNav;

// import React, { useEffect, useState } from 'react';
// import EstMat from './EstMat';
// import EstLab from './EstLab';
// import EstMac from './EstMac';
// import EstTran from './EstTran';
// import EstWel from './EstWel';
// import EstSun from './EstSun';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EstNav({ estimateId, onClose }) {
//     const { id } = useParams();
//     // alert('Estimate ID:', id);
//     const [values, setValues] = useState({}); // Initialize with an empty object

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/est/est/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }
//                 const { id: EstID, Date, Estimated } = response.data.estimate;
                
//                 // Set values with the data fetched
//                 setValues({  EstID, Date, Estimated });
//                 console.log('Estimate Data:', response.data.EstID);
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//     }, [id]);

//     // const handleClose = () => {
//     //     if (isFormChanged) {
//     //         const confirmLeave = window.confirm('You have unsaved changes. Do you really want to leave?');
//     //         if (confirmLeave) {
//     //             onClose();
//     //         }
//     //     } else {
//     //         onClose();
//     //     }
//     // };
//     return (
//         <div className='container-fluid mt-5'>
//             <ul className="nav nav-tabs" id="myTab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link active"
//                         id="Material-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Material"
//                         type="button"
//                         role="tab"
//                         aria-controls="home"
//                         aria-selected="true"
//                     >
//                         Material {values.EstID}
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Labours-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Labours"
//                         type="button"
//                         role="tab"
//                         aria-controls="Labours"
//                         aria-selected="false"
//                     >
//                         Labours
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Machinery-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Machinery"
//                         type="button"
//                         role="tab"
//                         aria-controls="Machinery"
//                         aria-selected="false"
//                     >
//                         Machinery
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Transport-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Transport"
//                         type="button"
//                         role="tab"
//                         aria-controls="Transport"
//                         aria-selected="false"
//                     >
//                         Transport
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Welding-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Welding"
//                         type="button"
//                         role="tab"
//                         aria-controls="Welding"
//                         aria-selected="false"
//                     >
//                         Welding
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className="nav-link"
//                         id="Sundries-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Sundries"
//                         type="Sundries"
//                         role="tab"
//                         aria-controls="Sundries"
//                         aria-selected="false"
//                     >
//                         Sundries
//                     </button>
//                 </li>
//             </ul>
//             <div className="tab-content" id="myTabContent">
//                 <div
//                     className="tab-pane fade show active"
//                     id="Material"
//                     role="tabpanel"
//                     aria-labelledby="Material-tab"
//                 >
//                     {values.EstID && <EstMat values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
//                     {values.EstID && <EstLab values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
//                     {values.EstID && <EstMac values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
//                     {values.EstID && <EstTran values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
//                     {values.EstID && <EstWel values={{ EstID: values.EstID }} />}
//                 </div>
//                 <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
//                     {values.EstID && <EstSun values={{ EstID: values.EstID }} />}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EstNav;
// import React, { useEffect, useState } from 'react';
// import EstMat from './EstMat';
// import EstLab from './EstLab';
// import EstMac from './EstMac';
// import EstTran from './EstTran';
// import EstWel from './EstWel';
// import EstSun from './EstSun';
// import axios from 'axios';

// function EstNav({ estimateId, onClose }) {
//     const [values, setValues] = useState({
//         Suppliers: '',
//         QuotationNo: '',
//         Quotationimg: [],
//     });
//     const [estID, setEstID] = useState(null);
//     const [matDetails, setMatDetails] = useState([{ Material: '', Mat_cost: '', MatQ: '' }]);
//     const [labDetails, setLabDetails] = useState([{ Labour: '', Lab_cost: '', LabQ: '' }]);
//     const [macDetails, setMacDetails] = useState([{ Machining: '', Mac_cost: '', MacQ: '' }]);
//     const [tranDetails, setTranDetails] = useState([{ Transport: '', Trans_cost: '', TransQ: '' }]);
//     const [welDetails, setWelDetails] = useState([{ Welding: '', Wel_cost: '', WelQ: '' }]);
//     const [sunDetails, setSunDetails] = useState([{ Sundries: '', Sun_cost: '', SunQ: '' }]);

//     useEffect(() => {
//         const fetchEstimate = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get(`http://localhost:8081/api/est/est/${estimateId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimate: ${response.statusText}`);
//                 }
//                 const { id: EstID, Date, Estimated } = response.data.estimate;
                
//                 // Set values with the data fetched
//                 setEstID(EstID);
//                 console.log('Estimate Data:', response.data.estimate);
//             } catch (error) {
//                 console.error('Error fetching estimate:', error);
//                 alert(error.message);
//             }
//         };

//         fetchEstimate();
//     }, [estimateId]);

//     const handleClose = () => {
//         onClose();
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setValues({ ...values, Quotationimg: files });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('Suppliers', values.Suppliers);
//         formData.append('QuotationNo', values.QuotationNo);
//         formData.append('matDetails', JSON.stringify(matDetails));
//         formData.append('labDetails', JSON.stringify(labDetails));
//         formData.append('macDetails', JSON.stringify(macDetails));
//         formData.append('tranDetails', JSON.stringify(tranDetails));
//         formData.append('welDetails', JSON.stringify(welDetails));
//         formData.append('sunDetails', JSON.stringify(sunDetails));

//         // Append images
//         values.Quotationimg.forEach((file) => {
//             formData.append('Quotationimg', file);
//         });

//         try {
//             const response = await axios.post(`http://localhost:8081/api/est/submitCategory/all/${estID}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert('Estimation submitted successfully!');
//             window.location.reload();
//         } catch (error) {
//             console.error('Error submitting estimation:', error);
//             alert('Failed to submit estimation');
//         }
//     };

//     return (
//         <div className='container-fluid'>
//             <div className='d-flex justify-content-end'>
                
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className='row mb-3'>
//                     <label className='col-sm-2 col-form-label'>Suppliers:</label>
//                     <div className='col-sm-10'>
//                         <input
//                             type='text'
//                             className='form-control'
//                             name='Suppliers'
//                             value={values.Suppliers}
//                             onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <div className='row mb-3'>
//                     <label className='col-sm-2 col-form-label'>Quotation Number:</label>
//                     <div className='col-sm-10'>
//                         <input
//                             type='text'
//                             className='form-control'
//                             name='QuotationNo'
//                             value={values.QuotationNo}
//                             onChange={(e) => setValues({ ...values, QuotationNo: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <div className='row mb-3'>
//                     <label className='col-sm-2 col-form-label'>Quotation Images:</label>
//                     <div className='col-sm-10'>
//                         <input
//                             type='file'
//                             name='Quotationimg'
//                             multiple
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                 </div>
//                 <ul className="nav nav-tabs" id="myTab" role="tablist">
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link active"
//                             id="Material-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Material"
//                             type="button"
//                             role="tab"
//                             aria-controls="home"
//                             aria-selected="true"
//                         >
//                             Material {estID}
//                         </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link"
//                             id="Labours-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Labours"
//                             type="button"
//                             role="tab"
//                             aria-controls="Labours"
//                             aria-selected="false"
//                         >
//                             Labours
//                         </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link"
//                             id="Machinery-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Machinery"
//                             type="button"
//                             role="tab"
//                             aria-controls="Machinery"
//                             aria-selected="false"
//                         >
//                             Machinery
//                         </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link"
//                             id="Transport-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Transport"
//                             type="button"
//                             role="tab"
//                             aria-controls="Transport"
//                             aria-selected="false"
//                         >
//                             Transport
//                         </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link"
//                             id="Welding-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Welding"
//                             type="button"
//                             role="tab"
//                             aria-controls="Welding"
//                             aria-selected="false"
//                         >
//                             Welding
//                         </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <button
//                             className="nav-link"
//                             id="Sundries-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#Sundries"
//                             type="Sundries"
//                             role="tab"
//                             aria-controls="Sundries"
//                             aria-selected="false"
//                         >
//                             Sundries
//                         </button>
//                     </li>
//                 </ul>
//                 <div className="tab-content" id="myTabContent">
//                     <div
//                         className="tab-pane fade show active"
//                         id="Material"
//                         role="tabpanel"
//                         aria-labelledby="Material-tab"
//                     >
//                         {estID && <EstMat details={matDetails} setDetails={setMatDetails} />}
//                     </div>
//                     <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
//                         {estID && <EstLab details={labDetails} setDetails={setLabDetails} />}
//                     </div>
//                     <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
//                         {estID && <EstMac details={macDetails} setDetails={setMacDetails} />}
//                     </div>
//                     <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
//                         {estID && <EstTran details={tranDetails} setDetails={setTranDetails} />}
//                     </div>
//                     <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
//                         {estID && <EstWel details={welDetails} setDetails={setWelDetails} />}
//                     </div>
//                     <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
//                         {estID && <EstSun details={sunDetails} setDetails={setSunDetails} />}
//                     </div>
//                 </div>
//                 <div className=' row d-flex justify-center'>
//                     <button type="button" className="btn btn-secondary col-5" onClick={handleClose}>
//                         cancel
//                     </button>
//                     <button className='btn btn-primary col-5' type='submit'>Submit Estimation</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default EstNav;

import React, { useEffect, useState } from 'react';
import EstMat from './EstMat';
import EstLab from './EstLab';
import EstMac from './EstMac';
import EstTran from './EstTran';
import EstWel from './EstWel';
import EstSun from './EstSun';
import axios from 'axios';

function EstNav({ estimateId, onClose }) {
    const [values, setValues] = useState({
        Suppliers: '',
        QuotationNo: '',
        Quotationimg: [],
    });
    const [estID, setEstID] = useState(null);
    const [matDetails, setMatDetails] = useState([{ Material: '', Mat_cost: '', MatQ: '' }]);
    const [labDetails, setLabDetails] = useState([{ Labour: '', Lab_cost: '', LabQ: '' }]);
    const [macDetails, setMacDetails] = useState([{ Machining: '', Mac_cost: '', MacQ: '' }]);
    const [tranDetails, setTranDetails] = useState([{ Transport: '', Trans_cost: '', TransQ: '' }]);
    const [welDetails, setWelDetails] = useState([{ Welding: '', Wel_cost: '', WelQ: '' }]);
    const [sunDetails, setSunDetails] = useState([{ Sundries: '', Sun_cost: '', SunQ: '' }]);

    useEffect(() => {
        const fetchEstimate = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:8081/api/est/est/${estimateId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status !== 200) {
                    throw new Error(`Error fetching estimate: ${response.statusText}`);
                }
                const { id: EstID, Date, Estimated } = response.data.estimate;
                
                // Set values with the data fetched
                setEstID(EstID);
                console.log('Estimate Data:', response.data.estimate);
            } catch (error) {
                console.error('Error fetching estimate:', error);
                alert(error.message);
            }
        };

        fetchEstimate();
    }, [estimateId]);

    const handleClose = () => {
        onClose();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setValues({ ...values, Quotationimg: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('QuotationNo', values.QuotationNo);
        formData.append('matDetails', JSON.stringify(matDetails));
        formData.append('labDetails', JSON.stringify(labDetails));
        formData.append('macDetails', JSON.stringify(macDetails));
        formData.append('tranDetails', JSON.stringify(tranDetails));
        formData.append('welDetails', JSON.stringify(welDetails));
        formData.append('sunDetails', JSON.stringify(sunDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/est/submitCategory/all/${estID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Estimation submitted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting estimation:', error);
            alert('Failed to submit estimation');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-end'>
                <button type="button" className="btn btn-danger" onClick={handleClose}>
                    X
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Suppliers:</label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className='form-control'
                            name='Suppliers'
                            value={values.Suppliers}
                            onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Quotation Number:</label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className='form-control'
                            name='QuotationNo'
                            value={values.QuotationNo}
                            onChange={(e) => setValues({ ...values, QuotationNo: e.target.value })}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Quotation Images:</label>
                    <div className='col-sm-10'>
                        <input
                            type='file'
                            name='Quotationimg'
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="Material-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Material"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                        >
                            Material {estID}
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="Labours-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Labours"
                            type="button"
                            role="tab"
                            aria-controls="Labours"
                            aria-selected="false"
                        >
                            Labours
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="Machinery-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Machinery"
                            type="button"
                            role="tab"
                            aria-controls="Machinery"
                            aria-selected="false"
                        >
                            Machinery
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="Transport-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Transport"
                            type="button"
                            role="tab"
                            aria-controls="Transport"
                            aria-selected="false"
                        >
                            Transport
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="Welding-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Welding"
                            type="button"
                            role="tab"
                            aria-controls="Welding"
                            aria-selected="false"
                        >
                            Welding
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="Material"
                        role="tabpanel"
                        aria-labelledby="Material-tab"
                    >
                        {estID && <EstMat details={matDetails} setDetails={setMatDetails} />}
                    </div>
                    <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
                        {estID && <EstLab details={labDetails} setDetails={setLabDetails} />}
                    </div>
                    <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
                        {estID && <EstMac details={macDetails} setDetails={setMacDetails} />}
                    </div>
                    <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
                        {estID && <EstTran details={tranDetails} setDetails={setTranDetails} />}
                    </div>
                    <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
                        {estID && <EstWel details={welDetails} setDetails={setWelDetails} />}
                    </div>
                    {/* <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
                        {estID && <EstSun details={sunDetails} setDetails={setSunDetails} />}
                    </div> */}
                </div>
                <div className=' row d-flex justify-center'>
                    <button type="button" className="btn btn-secondary col-5" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='btn btn-primary col-5' type='submit'>Submit Estimation</button>
                </div>
            </form>
        </div>
    );
}

export default EstNav;