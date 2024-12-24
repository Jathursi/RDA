import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Completion() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false); // Track if data already exists
    const [values, setValues] = useState({
        ID: id,
        supervised: '',
        initiated: '',
        closed: '',
        approved: '',
        aditional_fault: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/comp/comp/${id}`);
                console.log('Completion Data:', res.data);

                if (res.data && res.data.length > 0) {
                    const completionData = res.data[0];
                    setValues({
                        supervised: completionData.supervised || '',
                        initiated: completionData.initiated || '',
                        closed: completionData.closed || '',
                        approved: completionData.approved || '',
                        aditional_fault: completionData.aditional_fault || ''
                    });
                    setIsUpdate(true); // Set to true if data exists
                }
            } catch (err) {
                console.error('Error fetching completion data:', err);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const url = `http://localhost:8081/api/comp/${isUpdate ? 'comp' : 'Cominsert'}/${id}`;
        const request = isUpdate ? axios.put : axios.post;

        request(url, values)
            .then(res => {
                console.log(isUpdate ? "Completion details updated successfully" : "Completion details added successfully");
                setIsUpdate(true); // After initial post, switch to update mode
                navigate('/Home');
            })
            .catch(err => {
                console.error(`Error ${isUpdate ? 'updating' : 'adding'} completion details:`, err);
            });
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
    }

    return (
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleUpdate}>
                    <h3>Completion</h3>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Supervised by:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='supervised'
                                value={values.supervised}
                                onChange={(e) => setValues({ ...values, supervised: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Initiated by:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='initiated'
                                value={values.initiated}
                                onChange={(e) => setValues({ ...values, initiated: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Closed by:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='closed'
                                value={values.closed}
                                onChange={(e) => setValues({ ...values, closed: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Approved by:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='approved'
                                value={values.approved}
                                onChange={(e) => setValues({ ...values, approved: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Voucher:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='aditional_fault'
                                value={values.aditional_fault}
                                onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Aditional Fault:</label>
                        <div className='col-sm-10'>
                            <textarea
                                type='text'
                                rows={4}
                                className='form-control'
                                name='aditional_fault'
                                value={values.aditional_fault}
                                onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>
                            {isUpdate ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // <div className='formContainer-com'>
        //     {/* <div className='formTitle'>Completion</div> */}
        //     <form onSubmit={handleUpdate} className='form'>
        //         <div className='formTitle'>Completion</div>
        //         <div className='formGroup'>
        //             <label className='label'>Supervised by:</label>
        //             <input className='input' type='text' name='supervised' value={values.supervised} onChange={(e) => setValues({ ...values, supervised: e.target.value })} />
        //         </div>
        //         <div className='formGroup'>
        //             <label className='label'>Initiated by:</label>
        //             <input className='input' type='text' name='initiated' value={values.initiated} onChange={(e) => setValues({ ...values, initiated: e.target.value })} />
        //         </div>
        //         <div className='formGroup'>
        //             <label className='label'>Closed by:</label>
        //             <input className='input' type='text' name='closed' value={values.closed} onChange={(e) => setValues({ ...values, closed: e.target.value })} />
        //         </div>
        //         <div className='formGroup'>
        //             <label className='label'>Approved by:</label>
        //             <input className='input' type='text' name='approved' value={values.approved} onChange={(e) => setValues({ ...values, approved: e.target.value })} />
        //         </div>
        //         <div className='formGroup'> 
        //             <label className='label'>Voucher:</label>
        //             <input className='text' type='text' name='aditional_fault' value={values.aditional_fault} onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })} />
        //         </div>
        //         <div className='formGroup'>
        //             <label className='label'>Aditional Fault:</label>
        //             <input className='textarea' type='text' name='aditional_fault' value={values.aditional_fault} onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })} />
        //         </div>
        //         <div className='form-Imp-btn'>
        //             <button type='submit'>{isUpdate ? 'Update' : 'Add'}</button>
        //         </div>
        //     </form>
        // </div>
    )
}

export default Completion;
