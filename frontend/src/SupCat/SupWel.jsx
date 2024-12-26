import React, { useState } from 'react';
import axios from 'axios';

function SupWel({ values: initialValues }) {
    const { supID } = initialValues;
    const [visibleSections, setVisibleSections] = useState(1);
    const [values, setValues] = useState({
        Suppliers: '',
        QuotationNo: '',
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

    const [welDetails, setWelDetails] = useState([
        { Welding: '', Wel_cost: '', WelQ: '' }
    ]);
    const welHandler = createDetailsHandler(welDetails, setWelDetails, { Welding: '', Wel_cost: '', WelQ: '' });

    // Handle file change for quotation image(s)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setValues({ ...values, Quotationimg: files });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supID); // Log supID to ensure it is correct
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('QuotationNo', values.QuotationNo);
        formData.append('details', JSON.stringify(welDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/sup/submitCategory/welding/${supID}`, formData, {
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
        <form className='mt-4' onSubmit={handleSubmit}>
            <h3>Welding Details</h3>
            <div className='mb-3 row'>
                <label className='col-sm-2 col-form-label'>Supplier:</label>
                <div className='col-sm-10'>
                    <input
                        type='text'
                        className='form-control'
                        name='Suppliers'
                        value={values.Suppliers}
                        onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
                        placeholder='Supplier'
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
                        placeholder='Quotation Number'
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <label className='col-sm-2 col-form-label'>Quotation Images:</label>
                <div className='col-sm-10'>
                    <input
                        className='form-control'
                        type='file'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            {welDetails.map((wel, index) => (
                <div key={index}>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Welding:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='Welding'
                                value={wel.Welding}
                                onChange={(e) => welHandler.handleChange(e, index)}
                                placeholder='Welding'
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Welding Cost:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='Wel_cost'
                                value={wel.Wel_cost}
                                onChange={(e) => welHandler.handleChange(e, index)}
                                placeholder='Welding Cost'
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Welding Quantity:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='WelQ'
                                value={wel.WelQ}
                                onChange={(e) => welHandler.handleChange(e, index)}
                                placeholder='Welding Quantity'
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className='d-grid mb-3'>
            <button type='button' className='btn btn-secondary' onClick={welHandler.handleAdd}>
                Add Welding
            </button>
            <button type='submit' className='btn btn-primary'>
                Submit Estimation
            </button>
            </div>
        </form>
    );
}

export default SupWel;