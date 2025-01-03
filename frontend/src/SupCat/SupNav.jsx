import React, { useEffect, useState } from 'react';
import SupMat from './SupMat';
import SupLab from './SupLab';
import SupMac from './SupMac';
import SupTrans from './SupTrans';
import SupWel from './SupWel';
import SupSun from './SupSun';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SupNav() {
    const { id } = useParams();
    const [values, setValues] = useState({}); // Initialize with an empty object

    useEffect(() => {
        const fetchEstimate = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:8081/api/sup/Supselect/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status !== 200) {
                    throw new Error(`Error fetching estimate: ${response.statusText}`);
                }

                const { id: supID, Date, Estimated } = response.data.suppliment; // Ensure this matches the response structure
                setValues({ supID, Date, Estimated });
            } catch (error) {
                console.error('Error fetching estimate:', error);
                alert(error.message);
            }
        };

        fetchEstimate();
    }, [id]);

    return (
        <div className='container-fluid mt-5'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="Material-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Material"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                    >
                        Material {values.supID}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Labours-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Labours"
                        type="button"
                        role="tab"
                        aria-controls="Labours"
                        aria-selected="false"
                    >
                        Labours
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Machinery-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Machinery"
                        type="button"
                        role="tab"
                        aria-controls="Machinery"
                        aria-selected="false"
                    >
                        Machinery
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Transport-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Transport"
                        type="button"
                        role="tab"
                        aria-controls="Transport"
                        aria-selected="false"
                    >
                        Transport
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Welding-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Welding"
                        type="button"
                        role="tab"
                        aria-controls="Welding"
                        aria-selected="false"
                    >
                        Welding
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Sundries-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Sundries"
                        type="Sundries"
                        role="tab"
                        aria-controls="Sundries"
                        aria-selected="false"
                    >
                        Sundries
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="Material"
                    role="tabpanel"
                    aria-labelledby="Material-tab"
                >
                    {values.supID && <SupMat values={{ supID: values.supID }} />}
                </div>
                <div className="tab-pane fade" id="Labours" role="tabpanel" aria-labelledby="Labours-tab">
                    {values.supID && <SupLab values={{ supID: values.supID }} />}
                </div>
                <div className="tab-pane fade" id="Machinery" role="tabpanel" aria-labelledby="Machinery-tab">
                    {values.supID && <SupMac values={{ supID: values.supID }} />}
                </div>
                <div className="tab-pane fade" id="Transport" role="tabpanel" aria-labelledby="Transport-tab">
                    {values.supID && <SupTrans values={{ supID: values.supID }} />}
                </div>
                <div className="tab-pane fade" id="Welding" role="tabpanel" aria-labelledby="Welding-tab">
                    {values.supID && <SupWel values={{ supID: values.supID }} />}
                </div>
                <div className="tab-pane fade" id="Sundries" role="tabpanel" aria-labelledby="Sundries-tab">
                    {values.supID && <SupSun values={{ supID: values.supID }} />}
                </div>
            </div>
        </div>
    );
}

export default SupNav;