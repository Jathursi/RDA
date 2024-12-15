import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Completion() {
    const navigate = useNavigate();
    const { id } = useParams();
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

    return (
        <div className='formContainer-com'>
            {/* <div className='formTitle'>Completion</div> */}
            <form onSubmit={handleUpdate} className='form'>
                <div className='formTitle'>Completion</div>
                <div className='formGroup'>
                    <label className='label'>Supervised:</label>
                    <input className='input' type='text' name='supervised' value={values.supervised} onChange={(e) => setValues({ ...values, supervised: e.target.value })} />
                </div>
                <div className='formGroup'>
                    <label className='label'>Initiated:</label>
                    <input className='input' type='text' name='initiated' value={values.initiated} onChange={(e) => setValues({ ...values, initiated: e.target.value })} />
                </div>
                <div className='formGroup'>
                    <label className='label'>Closed:</label>
                    <input className='input' type='text' name='closed' value={values.closed} onChange={(e) => setValues({ ...values, closed: e.target.value })} />
                </div>
                <div className='formGroup'>
                    <label className='label'>Approved:</label>
                    <input className='input' type='text' name='approved' value={values.approved} onChange={(e) => setValues({ ...values, approved: e.target.value })} />
                </div>
                <div className='formGroup'>
                    <label className='label'>Aditional Fault:</label>
                    <input className='textarea' type='text' name='aditional_fault' value={values.aditional_fault} onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })} />
                </div>
                <div className='form-Imp-btn'>
                    <button type='submit'>{isUpdate ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </div>
    )
}

export default Completion;
