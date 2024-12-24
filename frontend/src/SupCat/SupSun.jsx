import React, { useState } from 'react';
import axios from 'axios';

function SupSun({ values: initialValues }) {
    const { supplimentID } = initialValues;
    const [visibleSections, setVisibleSections] = useState(1);
    const [values, setValues] = useState({
        Suppliers: '',
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

    const [sunDetails, setSunDetails] = useState([
        { Sundries: '', Sun_cost: '', SunQ: '' }
    ]);
    const sunHandler = createDetailsHandler(sunDetails, setSunDetails, { Sundries: '', Sun_cost: '', SunQ: '' });

    // Handle file change for quotation image(s)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setValues({ ...values, Quotationimg: files });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supplimentID); // Log EstID to ensure it is correct
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('details', JSON.stringify(sunDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/sup/submitCategory/sundries/${supplimentID}`, formData, {
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
        <div className='formContainer-imp'>
            <h1>Sundries Details</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Supplier</label>
                    <input
                        type='text'
                        name='Suppliers'
                        value={values.Suppliers}
                        onChange={(e) => setValues({ ...values, Suppliers: e.target.value })}
                        placeholder='Suppliers'
                    />
                </div>
                
                {/* File Input for Quotation Images */}
                <div className='form-group'>
                    <label>Quotation Images</label>
                    <input
                        type='file'
                        name='Quotationimg'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                {/* Sundries Details Input */}
                {sunDetails.map((sun, index) => (
                    <div key={index}>
                        <input
                            type='text'
                            name='Sundries'
                            value={sun.Sundries}
                            onChange={(e) => sunHandler.handleChange(e, index)}
                            placeholder='Sundries'
                        />
                        <input
                            type='number'
                            name='Sun_cost'
                            value={sun.Sun_cost}
                            onChange={(e) => sunHandler.handleChange(e, index)}
                            placeholder='Sundries Cost'
                        />
                        <input
                            type='number'
                            name='SunQ'
                            value={sun.SunQ}
                            onChange={(e) => sunHandler.handleChange(e, index)}
                            placeholder='Sundries Quantity'
                        />
                    </div>
                ))}
                <button type="button" onClick={sunHandler.handleAdd}>Add Sundries</button>

                <button type='submit'>Submit Estimation</button>
            </form>
        </div>
    );
}

export default SupSun;