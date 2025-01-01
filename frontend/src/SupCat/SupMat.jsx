import React, { useState } from 'react';
import axios from 'axios';

function SupMat({ values: initialValues }) {
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

    const [matDetails, setMatDetails] = useState([
        { Material: '', Mat_cost: '', MatQ: '', supID: supID }
    ]);
    const matHandler = createDetailsHandler(matDetails, setMatDetails, { Material: '', Mat_cost: '', MatQ: '', supID: supID });

    // Handle file change for quotation image(s)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setValues({ ...values, Quotationimg: files });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(supID); // Log supID to ensure it is correct
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('QuotationNo', values.QuotationNo);
        formData.append('details', JSON.stringify(matDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/sup/submitCategory/material/${supID}`, formData, {
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
            <h3>Material Details {supID}</h3>
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
            {matDetails.map((mat, index) => (
                <div key={index}>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Material:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='Material'
                                value={mat.Material}
                                onChange={(e) => matHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Material Cost:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='Mat_cost'
                                value={mat.Mat_cost}
                                onChange={(e) => matHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-2 col-form-label'>Material Quantity:</label>
                        <div className='col-sm-10'>
                            <input
                                type='number'
                                className='form-control'
                                name='MatQ'
                                value={mat.MatQ}
                                onChange={(e) => matHandler.handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <hr className='text-dark'/>
                </div>
            ))}
            <div className='d-grid gap-3'>
                <button className='btn btn-secondary' type="button" onClick={matHandler.handleAdd}>Add Material</button>
                <button className='btn btn-primary' type='submit'>Submit Estimation</button>
            </div>
        </form>
    );
}

export default SupMat;