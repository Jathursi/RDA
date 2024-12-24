import React, { useState } from 'react';
import axios from 'axios';

function SupWel({ values: initialValues }) {
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
        console.log(supplimentID); // Log EstID to ensure it is correct
        const formData = new FormData();
        formData.append('Suppliers', values.Suppliers);
        formData.append('details', JSON.stringify(welDetails));

        // Append images
        values.Quotationimg.forEach((file) => {
            formData.append('Quotationimg', file);
        });

        try {
            const response = await axios.post(`http://localhost:8081/api/sup/submitCategory/welding/${supplimentID}`, formData, {
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
            <h1>Welding Details</h1>
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

                {/* Welding Details Input */}
                {welDetails.map((wel, index) => (
                    <div key={index}>
                        <input
                            type='text'
                            name='Welding'
                            value={wel.Welding}
                            onChange={(e) => welHandler.handleChange(e, index)}
                            placeholder='Welding'
                        />
                        <input
                            type='number'
                            name='Wel_cost'
                            value={wel.Wel_cost}
                            onChange={(e) => welHandler.handleChange(e, index)}
                            placeholder='Welding Cost'
                        />
                        <input
                            type='number'
                            name='WelQ'
                            value={wel.WelQ}
                            onChange={(e) => welHandler.handleChange(e, index)}
                            placeholder='Welding Quantity'
                        />
                    </div>
                ))}
                <button type="button" onClick={welHandler.handleAdd}>Add Welding</button>

                <button type='submit'>Submit Estimation</button>
            </form>
        </div>
    );
}

export default SupWel;