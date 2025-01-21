// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { IoMdAdd } from "react-icons/io";
// import EstRegist from './EstRegist';
// import EstNav from '../EstCat/EstNav';
// import EstPrint from './EstPrint';
// import EstSun from '../EstCat/EstSun';

// function Estimation() {
//     const { id: logbookID } = useParams();
//     const [estimates, setEstimates] = useState([]);
//     const [error, setError] = useState(null);
//     const [showRegist, setShowRegist] = useState(false);
//     const [showMat, setShowMat] = useState(false);
//     const [showsun, setShowsun] = useState(false);
//     const [selectedEstimateId, setSelectedEstimateId] = useState(null);
//     const [selectedEstimate, setSelectedEstimate] = useState(null); // State to hold the selected estimate for editing

//     useEffect(() => {
//         const fetchEstimates = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) throw new Error('No token found');

//                 const response = await axios.get(`http://localhost:8081/api/est/Estselect/${logbookID}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setEstimates(response.data.estimates);
//                 if (response.status !== 200) {
//                     throw new Error(`Error fetching estimates: ${response.statusText}`);
//                 }
//             } catch (error) {
//                 console.error('Error fetching estimates:', error);
//                 setError(error.message || 'Failed to fetch estimates');
//             }
//         };

//         fetchEstimates();
//     }, [logbookID]);

//     const handleEdit = (estimate) => {
//         setSelectedEstimate(estimate);
//         setShowRegist(true);
//     };

//     return (
//         <div className="row">
//             <div className="col-md-12">
//                 <div className="table-wrapper">
//                     <div className="table-title">
//                         <div className="row title-row">
//                             <div className="col-sm-6 p-0 d-flex justify-content-lg-start">
//                                 <h2 className="hid ml-lg-2 items-center">Estimation</h2>
//                             </div>
//                             <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
//                                 <button
//                                     className="btn btn-success flex items-center gap-3"
//                                     onClick={() => {
//                                         setSelectedEstimate(null); // Clear selected estimate for new entry
//                                         setShowRegist(true);
//                                     }}
//                                 >
//                                     <IoMdAdd size={20} />
//                                     <span className="mx-2">Add Estimation</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Table for displaying estimates */}
//                     {error && <p className="error-message">{error}</p>}
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Estimated</th>
//                                 <th>Date</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {estimates.length > 0 ? (
//                                 estimates.map((estimate, index) => (
//                                     <tr key={estimate.id}>
//                                         <td>{index + 1}</td>
//                                         <td>{estimate.Estimated}</td>
//                                         <td>{new Date(estimate.Date).toLocaleDateString()}</td>
//                                         <td className='row gap-2'>
//                                             <button className='btn btn-warning col-3' onClick={() => handleEdit(estimate)}>Edit</button>
//                                             <button className='btn col-4 text-white'
//                                                 onClick={() => {
//                                                     setSelectedEstimateId(estimate.id);
//                                                     setShowMat(true);
//                                                 }}
//                                                 style={{ backgroundColor: ' #03A9F4 ' }}
//                                             >
//                                                 + Material
//                                             </button>
//                                             <button className='btn col-3'
//                                             onClick={() => {
//                                                     setSelectedEstimateId(estimate.id);
//                                                     setShowsun(true);
//                                                 }}
//                                             >
//                                                 sundries
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4">No estimates available</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//                 <EstPrint />
//             </div>
//             {showRegist && (
//                 <div className="modal-overlay">
//                     <div className="modal-container">
//                         <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
//                         <EstRegist
//                             onClose={() => setShowRegist(false)}
//                             estimate={selectedEstimate} // Pass the selected estimate for editing
//                         />
//                     </div>
//                 </div>
//             )}
//             {showMat && (
//                 <div className="modal-overlay">
//                     <div className="modal-container">
//                         <button className="close-button" onClick={() => setShowMat(false)}>X</button>
//                         <EstNav estimateId={selectedEstimateId} onClose={() => setShowMat(false)} />
//                     </div>
//                 </div>
//             )}
//             {showsun && (
//                 <div className="modal-overlay">
//                     <div className="modal-container">
//                         <button className="close-button" onClick={() => setShowMat(false)}>X</button>
//                         <EstSun estimateId={selectedEstimateId} onClose={() => setShowMat(false)} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Estimation;

import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import EstRegist from './EstRegist';
import EstNav from '../EstCat/EstNav';
import EstPrint from './EstPrint';
import EstSun from '../EstCat/EstSun';

function Estimation() {
    const { id: logbookID } = useParams();
    const [estimates, setEstimates] = useState([]);
    const [error, setError] = useState(null);
    const [showRegist, setShowRegist] = useState(false);
    const [showMat, setShowMat] = useState(false);
    const [showsun, setShowsun] = useState(false);
    const [selectedEstimateId, setSelectedEstimateId] = useState(null);
    const [selectedEstimate, setSelectedEstimate] = useState(null); // State to hold the selected estimate for editing

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await axios.get(`http://localhost:8081/api/est/Estselect/${logbookID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setEstimates(response.data.estimates);
                if (response.status !== 200) {
                    throw new Error(`Error fetching estimates: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching estimates:', error);
                setError(error.message || 'Failed to fetch estimates');
            }
        };

        fetchEstimates();
    }, [logbookID]);

    const handleEdit = (estimate) => {
        setSelectedEstimate(estimate);
        setShowRegist(true);
    };

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
                                    onClick={() => {
                                        setSelectedEstimate(null); // Clear selected estimate for new entry
                                        setShowRegist(true);
                                    }}
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
                                estimates.map((estimate, index) => (
                                    <tr key={estimate.id}>
                                        <td>{index + 1}</td>
                                        <td>{estimate.Estimated}</td>
                                        <td>{new Date(estimate.Date).toLocaleDateString()}</td>
                                        <td className='row gap-2'>
                                            <button className='btn btn-warning col-3' onClick={() => handleEdit(estimate)}>Edit</button>
                                            <button className='btn col-4 text-white'
                                                onClick={() => {
                                                    setSelectedEstimateId(estimate.id);
                                                    setShowMat(true);
                                                }}
                                                style={{ backgroundColor: ' #03A9F4 ' }}
                                            >
                                                + Material
                                            </button>
                                            <button className='btn col-3'
                                            onClick={() => {
                                                    setSelectedEstimateId(estimate.id);
                                                    setShowsun(true);
                                                }}
                                            >
                                                sundries
                                            </button>
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
                <EstPrint />
            </div>
            {showRegist && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
                        <EstRegist
                            onClose={() => setShowRegist(false)}
                            estimate={selectedEstimate} // Pass the selected estimate for editing
                        />
                    </div>
                </div>
            )}
            {showMat && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={() => setShowMat(false)}>X</button>
                        <EstNav estimateId={selectedEstimateId} onClose={() => setShowMat(false)} />
                    </div>
                </div>
            )}
            {showsun && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={() => setShowsun(false)}>X</button>
                        <EstSun values={{ EstID: selectedEstimateId }} onClose={() => setShowsun(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Estimation;