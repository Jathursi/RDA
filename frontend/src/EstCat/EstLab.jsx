// import React, { useState } from 'react';
// import axios from 'axios';

// function EstLab({ values: initialValues }) {
//     const { EstID } = initialValues;
//     const [visibleSections, setVisibleSections] = useState(1);
//     const [values, setValues] = useState({
//         Suppliers: '',
//         QuotationNo:'',
//         Quotationimg: [],
//     });

//     const createDetailsHandler = (detailsState, setDetailsState, defaultValues) => {
//         const handleChange = (event, index) => {
//             const { name, value } = event.target;
//             const newData = [...detailsState];
//             if (!newData[index]) {
//                 newData[index] = {};
//             }
//             newData[index][name] = value;
//             setDetailsState(newData);
//         };

//         const handleAdd = () => {
//             setDetailsState([...detailsState, defaultValues]);
//             setVisibleSections(visibleSections + 1);
//         };
//         return { handleChange, handleAdd };
//     };

//     const [labDetails, setLabDetails] = useState([
//         { Labour: '', Lab_cost: '', LabQ: '' }
//     ]);
//     const labHandler = createDetailsHandler(labDetails, setLabDetails, { Labour: '', Lab_cost: '', LabQ: '' });

//     // Handle file change for quotation image(s)
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setValues({ ...values, Quotationimg: files });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(EstID); // Log EstID to ensure it is correct
//         const formData = new FormData();
//         formData.append('Suppliers', values.Suppliers);
//         formData.append('QuotationNo', values.QuotationNo);
//         formData.append('details', JSON.stringify(labDetails));

//         // Append images
//         values.Quotationimg.forEach((file) => {
//             formData.append('Quotationimg', file);
//         });

//         try {
//             await axios.post(`http://localhost:8081/api/est/submitCategory/labour/${EstID}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert('Estimation submitted successfully!');
//         } catch (error) {
//             console.error('Error submitting estimation:', error);
//             alert('Failed to submit estimation');
//         }
//     };

//     return (
//             <form className='mt-4' onSubmit={handleSubmit}>
//                 <h3>Labour Details</h3>
//                 <div className="mb-3 row">
//                     <label className="col-sm-2 col-form-label">Suppliers:</label>
//                     <div className="col-sm-10">
//                         <input
//                             type='text'
//                             className='form-control'
//                             name='Suppliers'
//                             value={values.Suppliers}
//                             onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <div className="mb-3 row">
//                     <label className="col-sm-2 col-form-label">Quotation Number:</label>
//                     <div className="col-sm-10">
//                         <input
//                             type='text'
//                             className='form-control'
//                             name='QuotationNo'
//                             value={values.QuotationNo}
//                             onChange={(e) => setValues({ ...values, QuotationNo: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <div className="mb-3 row">
//                     <label className="col-sm-2 col-form-label">Quotation Image:</label>
//                     <div className="col-sm-10">
//                         <input
//                             type='file'
//                             multiple
//                             className='form-control'
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                 </div>
//                 {labDetails.map((lab, index) => (
//                     <div key={index}>
//                         <div className="mb-3 row">
//                             <label className="col-sm-2 col-form-label">Labour:</label>
//                             <div className="col-sm-10">
//                                 <input
//                                     type='text'
//                                     className='form-control'
//                                     name='Labour'
//                                     value={lab.Labour}
//                                     onChange={(e) => labHandler.handleChange(e, index)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-3 row">
//                             <label className="col-sm-2 col-form-label">Labour Cost:</label>
//                             <div className="col-sm-10">
//                                 <input
//                                     type='text'
//                                     name='Lab_cost'
//                                     className='form-control'
//                                     value={lab.Lab_cost}
//                                     onChange={(e) => labHandler.handleChange(e, index)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-3 row">
//                             <label className="col-sm-2 col-form-label">Labour Quantity:</label>
//                             <div className="col-sm-10">
//                                 <input
//                                     type='text'
//                                     name='LabQ'
//                                     className='form-control'
//                                     value={lab.LabQ}
//                                     onChange={(e) => labHandler.handleChange(e, index)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <div className="d-grid gap-3">
//                     <button type='button' className='btn btn-secondary' onClick={labHandler.handleAdd}>
//                         Add Labour
//                     </button>
//                     <button type='submit' className='btn btn-primary'>
//                         Submit
//                     </button>
//                 </div>
//             </form>
//     );
// }

// export default EstLab;


import React from 'react';

function EstLab({ details, setDetails }) {
    const createDetailsHandler = (detailsState, setDetailsState, defaultValues) => {
        const handleChange = (event, index) => {
            const { name, value } = event.target;
            const newData = [...detailsState];
            if (!newData[index]) {
                newData[index] = {};
            }
            newData[index][name] = value;
            setDetailsState(newData);
        };

        const handleAdd = () => {
            setDetailsState([...detailsState, defaultValues]);
        };
        return { handleChange, handleAdd };
    };

    const labHandler = createDetailsHandler(details, setDetails, { Labour: '', Lab_cost: '', LabQ: '' });

    return (
        <form className='mt-4'>
            <h3>Labour Details</h3>
            {details.map((lab, index) => (
                <div key={index}>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Labour:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='Labour'
                                value={lab.Labour}
                                onChange={(e) => labHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Labour Cost:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='Lab_cost'
                                value={lab.Lab_cost}
                                onChange={(e) => labHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Labour Quantity:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='LabQ'
                                value={lab.LabQ}
                                onChange={(e) => labHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <hr className='text-dark'/>
                </div>
            ))}
            <div className='d-grid gap-3'>
                <button className='btn btn-secondary' type="button" onClick={labHandler.handleAdd}>Add Labour</button>
            </div>
        </form>
    );
}

export default EstLab;