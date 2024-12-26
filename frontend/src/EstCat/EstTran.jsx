import React, { useState } from 'react';
import axios from 'axios';

function EstTran({ values: initialValues }) {
    const { EstID } = initialValues;
    const [visibleSections, setVisibleSections] = useState(1);
    const [values, setValues] = useState({
        Suppliers: '',
        QuotationNo:'',
        Quotationimg: [],
    });

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
            setVisibleSections(visibleSections + 1);
        };
        return { handleChange, handleAdd };
    };

    const [tranDetails, setTranDetails] = useState([
        { Transport: '', Trans_cost: '', TransQ: '' }
    ]);
    const tranHandler = createDetailsHandler(tranDetails, setTranDetails, { Transport: '', Trans_cost: '', TransQ: '' });

    // Handle file change for quotation image(s)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setValues({ ...values, Quotationimg: files });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(EstID); // Log EstID to ensure it is correct
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('QuotationNo', values.QuotationNo);
        formData.append('details', JSON.stringify(tranDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/est/submitCategory/transport/${EstID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Estimation submitted successfully!');
        } catch (error) {
            console.error('Error submitting estimation:', error);
            alert('Failed to submit estimation');
        }
    };

    return (
        // <div className='formContainer-imp'>
        //     <h1>Transport Details</h1>
        //     <form className='form' onSubmit={handleSubmit}>
        //         <div className='form-group'>
        //             <label>Supplier</label>
        //             <input
        //                 type='text'
        //                 name='Suppliers'
        //                 value={values.Suppliers}
        //                 onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
        //                 placeholder='Suppliers'
        //             />
        //         </div>
                
        //         {/* File Input for Quotation Images */}
        //         <div className='form-group'>
        //             <label>Quotation Images</label>
        //             <input
        //                 type='file'
        //                 name='Quotationimg'
        //                 multiple
        //                 onChange={handleFileChange}
        //             />
        //         </div>

        //         {/* Transport Details Input */}
        //         {tranDetails.map((tran, index) => (
        //             <div key={index}>
        //                 <input
        //                     type='text'
        //                     name='Transport'
        //                     value={tran.Transport}
        //                     onChange={(e) => tranHandler.handleChange(e, index)}
        //                     placeholder='Transport'
        //                 />
        //                 <input
        //                     type='number'
        //                     name='Trans_cost'
        //                     value={tran.Trans_cost}
        //                     onChange={(e) => tranHandler.handleChange(e, index)}
        //                     placeholder='Transport Cost'
        //                 />
        //                 <input
        //                     type='number'
        //                     name='TransQ'
        //                     value={tran.TransQ}
        //                     onChange={(e) => tranHandler.handleChange(e, index)}
        //                     placeholder='Transport Quantity'
        //                 />
        //             </div>
        //         ))}
        //         <button type="button" onClick={tranHandler.handleAdd}>Add Transport</button>

        //         <button type='submit'>Submit Estimation</button>
        //     </form>
        // </div>
        <form className='mt-4' onSubmit={handleSubmit}>
            <h2 className='formTitle pb-2 sm:pb-5'>Transport</h2>
            <div className='mb-3 row'>
                <label className='col-sm-2 col-form-label'>Supplier:</label>
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
            <div className='mb-3 row'>
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
            <div className='mb-3 row'>
                <label className='col-sm-2 col-form-label'>Quotation Images:</label>
                <div className='col-sm-10'>
                    <input className='form-control' type='file' multiple onChange={handleFileChange} />
                </div>
            </div>
            {tranDetails.map((tran, index) => (
                <div key={index}>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Transport:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='Transport'
                                value={tran.Transport}
                                onChange={(e) => tranHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Cost:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='Trans_cost'
                                value={values.Trans_cost}
                                onChange={(e) => tranHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Quantity:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='TransQ'
                                value={values.TransQ}
                                onChange={(e) => tranHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className='d-grid'>
                <button type='button' className='btn btn-secondary' onClick={tranHandler.handleAdd}>
                    Add Transport
                </button>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </div>
        </form>
    );
}

export default EstTran;