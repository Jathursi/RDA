import React, { useState } from 'react';
import axios from 'axios';

function EstSun({ values: initialValues }) {
    const { EstID } = initialValues;
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const url = `http://localhost:8081/api/est/submitCategory/sundries/${EstID}`;

        try {
            await axios.post(
                url,
                { details: sundriesDetails },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Sundries details saved successfully');
        } catch (err) {
            console.error('Error submitting sundries details:', err.response?.data || err.message);
            alert(err.response?.data?.error || err.message);
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

export default EstSun;