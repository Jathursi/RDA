import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import EstRegist from './EstRegist';
// import EstNav from '../EstCat/EstNav';
// import CreatableSelect from 'react-select/creatable';
// import EstPrint from './EstPrint';

function Estimation() {
    const { id: logbookID } = useParams();
    const [estimates, setEstimates] = useState([]);
    const [error, setError] = useState(null);
    // const [images, setImages] = useState([]);
    const [showRegist, setShowRegist] = useState(false);

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await axios.get(`http://localhost:8081/api/est/Estselect/${logbookID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEstimates(response.data.estimates); // Assuming the API returns an `estimates` field.
                if (response.status !== 200) {
                    throw new Error(`Error fetching estimates: ${response.statusText}`);
                }

                // setEstimates(response.data.estimates); // Update state with fetched data
                // setImages(response.data.images); // Update state with fetched images
                console.log('Estimates Data:', response.data.estimates);
                console.log('Images Data:', response.data.images);
            } catch (error) {
                console.error('Error fetching estimates:', error);
                setError(error.message || 'Failed to fetch estimates');
            }
        };

        fetchEstimates();
    }, [logbookID]);

    return (
<div className="row">
    <div className="col-md-12">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row title-row">
                    <div className="col-sm-6 p-0 d-flex justify-content-lg-start">
                        <h2 className="hid ml-lg-2 items-center">Estimation</h2>
                    </div>
                    <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                        <button
                            className="btn btn-success flex items-center gap-3"
                            onClick={() => setShowRegist(true)}
                        >
                            <IoMdAdd size={20} />
                            <span className="mx-2">Add Estimation</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Table for displaying estimates */}
            {error && <p className="error-message">{error}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Estimated</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {estimates.length > 0 ? (
                        estimates.map((estimate) => (
                            <tr key={estimate.id}>
                                <td>{estimate.id}</td>
                                <td>{estimate.Estimated}</td>
                                <td>{new Date(estimate.Date).toLocaleDateString()}</td>
                                <td>
                                  <button>Edit</button>
                                  <button>+ Material</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No estimates available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    {showRegist && (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
                <EstRegist onClose={() => setShowRegist(false)} />
            </div>
        </div>
    )}
</div>

    );
}

export default Estimation;