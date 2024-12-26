import React, { useState } from 'react';
import axios from 'axios';

function SupSun({ values: initialValues }) {
    const { supplimentID } = initialValues;
    const [visibleSections, setVisibleSections] = useState(1);

    const [sundriesDetails, setSundriesDetails] = useState([
        { Sundries: '', Sun_cost: '' }
    ]);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newData = [...sundriesDetails];
        newData[index][name] = value;
        setSundriesDetails(newData);
    };

    const handleAdd = () => {
        setSundriesDetails([...sundriesDetails, { Sundries: '', Sun_cost: '' }]);
        setVisibleSections(visibleSections + 1);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(supplimentID); // Log supplimentID to ensure it is correct
        const formData = new FormData();
        formData.append('details', JSON.stringify(sundriesDetails));

        try {
            await axios.post(`http://localhost:8081/api/sup/submitCategory/sundries/${supplimentID}`, formData);
            alert('Estimation submitted successfully!');
        } catch (error) {
            console.error('Error submitting estimation:', error);
            alert('Failed to submit estimation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="formTitle pb-2 sm:pb-5">Sundries</h2>
            {sundriesDetails.map((sundry, index) => (
                <div key={index}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Sundries:</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="Sundries"
                                value={sundry.Sundries}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Cost:</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                name="Sun_cost"
                                value={sundry.Sun_cost}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <hr className="text-dark"/>
                </div>
            ))}
            <div className="d-grid gap-3">
                <button type="button" className="btn btn-secondary" onClick={handleAdd}>
                    Add Sundry
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default SupSun;