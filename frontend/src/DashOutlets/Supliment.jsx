import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SupNav from '../SupCat/SupNav';

function Supliment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({ No: '', Date: '', Estimated: '', supID: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isInitialSubmission, setIsInitialSubmission] = useState(true);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(
            (file) => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/')
        );
        if (validFiles.length !== files.length) {
            alert('Some files are invalid (too large or not an image).');
        }
        setSelectedFiles(validFiles);
    };

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

                const {No,id: supID, Date, Estimated } = response.data.suppliment; // Ensure this matches the response structure
                const formattedDate = Date.split('T')[0]; // Split at "T" and take the first part
                setValues({ supID, No, Date : formattedDate, Estimated });
                setIsInitialSubmission(false); // Switch to update mode
            } catch (error) {
                console.error('Error fetching estimate:', error);
                // alert(error.message);
            }
        };

        fetchEstimate();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        selectedFiles.forEach((file) => formData.append('images', file));

        const token = localStorage.getItem('token');
        const url = isInitialSubmission
            ? `http://localhost:8081/api/sup/Supinsert/${id}`
            : `http://localhost:8081/api/sup/Supupdate/${id}`;
        const method = isInitialSubmission ? 'post' : 'put';

        try {
            await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(
                isInitialSubmission
                    ? 'Estimate created successfully'
                    : 'Estimate updated successfully'
            );
            navigate('/home');
        } catch (err) {
            console.error('Error submitting estimation:', err.response?.data || err.message);
            // alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="template d-flex align-items-center 100-w  sm:w-100 ">
        <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
            <h3>Suppliment {values.supID}</h3>
            <form className='mt-4'  onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Estimate No:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            name="No"
                            value={values.No}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Date:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="date"
                            name="Date"
                            value={values.Date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Estimated by:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            name="Estimated"
                            value={values.Estimated}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Condition of vehicle:</label>
                    <div className="col-sm-10">
                        <input type="file" multiple onChange={handleFileChange} />
                    </div>
                </div>
                <div className='d-grid'>
                    <button className='btn btn-primary' type="submit">{isInitialSubmission ? 'Submit' : 'Update'}</button>
                </div>
            </form>
            {values.supID && <SupNav values={{supID: values.supID}}/>}
            {/* {values.supID && <SupMat values={{ supID: values.supID }} />}
            {values.supID && <SupMac values={{ supID: values.supID }} />}
            {values.supID && <SupTrans values={{ supID: values.supID }} />}
            {values.supID && <SupWel values={{ supID: values.supID }} />}
            {values.supID && <SupSun values={{ supID: values.supID }} />}
            {values.supID && <SupLab values={{ supID: values.supID }} />} */}
        </div>
        </div>
    );
}

export default Supliment;




// export default Supliment;