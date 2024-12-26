import React, { useState } from 'react';
import axios from 'axios';

function EstMac({ values: initialValues }) {
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

    const [macDetails, setMacDetails] = useState([
        { Machining: '', Mac_cost: '', MacQ: '' }
    ]);
    const macHandler = createDetailsHandler(macDetails, setMacDetails, { Machining: '', Mac_cost: '', MacQ: '' });

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
        formData.append('details', JSON.stringify(macDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/est/submitCategory/machining/${EstID}`, formData, {
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
        //     <h1>Machining Details</h1>
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

        //         {/* Machining Details Input */}
        //         {macDetails.map((mac, index) => (
        //             <div key={index}>
        //                 <input
        //                     type='text'
        //                     name='Machining'
        //                     value={mac.Machining}
        //                     onChange={(e) => macHandler.handleChange(e, index)}
        //                     placeholder='Machining'
        //                 />
        //                 <input
        //                     type='number'
        //                     name='Mac_cost'
        //                     value={mac.Mac_cost}
        //                     onChange={(e) => macHandler.handleChange(e, index)}
        //                     placeholder='Machining Cost'
        //                 />
        //                 <input
        //                     type='number'
        //                     name='MacQ'
        //                     value={mac.MacQ}
        //                     onChange={(e) => macHandler.handleChange(e, index)}
        //                     placeholder='Machining Quantity'
        //                 />
        //             </div>
        //         ))}
        //         <button type="button" onClick={macHandler.handleAdd}>Add Machining</button>

        //         <button type='submit'>Submit Estimation</button>
        //     </form>
        // </div>
        <form className='mt-4' onSubmit={handleSubmit}>
        <h3>Machining Details</h3>
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
                    className='form-control'
                    multiple
                    onChange={handleFileChange}
                />
            </div>
        </div>
        {macDetails.map((mac, index) => (
            <div key={index}>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Machining:</label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className='form-control'
                            name='Machining'
                            value={mac.Machining}
                            onChange={(e) => macHandler.handleChange(e, index)}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Machining Cost:</label>
                    <div className='col-sm-10'>
                        <input
                            type='number'
                            className='form-control'
                            name='Mac_cost'
                            value={mac.Mac_cost}
                            onChange={(e) => macHandler.handleChange(e, index)}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label'>Machining Quantity:</label>
                    <div className='col-sm-10'>
                        <input
                            type='number'
                            className='form-control'
                            name='MacQ'
                            value={mac.MacQ}
                            onChange={(e) => macHandler.handleChange(e, index)}
                        />
                    </div>
                </div>
            </div>
        ))}
        <div className='d-grid gap-3'>
        <button type="button" className="btn btn-secondary" onClick={macHandler.handleAdd}>Add Machining</button>
        <button type='submit' className='btn btn-primary'>Submit Estimation</button>
        </div>
        </form>
    );
}

export default EstMac;