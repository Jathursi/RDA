import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OutSource() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState([{
        Date: '',
        Description: '',
        Job_NO: '',
        Supplier: "",
        cost: '',
        Authority: ''
    }]);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/out/Outview/${id}`);
        console.log('Outsource Data:', res.data); // Log the entire response to inspect

        // Check if the response is not empty and then update values
        if (res.data && res.data.length > 0) {
          setValues(res.data);
          setIsSubmitted(true); 
        }
      } catch (err) {
        console.error('Error fetching outsource data:', err);
      }
    };
    fetchData();
  }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const book_id = id;

        if (isSubmitted) {
            // Update existing records
            axios.put(`http://localhost:8081/api/out/Outupdate/${book_id}`, { values })
                .then(res => {
                    console.log("Logbook entries updated successfully");
                    navigate('/Home');
                })
                .catch(err => {
                    console.error('Error updating logbook entries:', err);
                });
        } else {
            // Initial submission
            axios.post(`http://localhost:8081/api/out/Outinsert/${book_id}`, { values })
                .then(res => {
                    console.log("Logbook entries added successfully");
                    setIsSubmitted(true); // Mark as submitted after successful post
                    navigate('/Home');
                })
                .catch(err => {
                    console.error('Error adding logbook entries:', err);
                });
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newValues = [...values];
        newValues[index][name] = value;
        setValues(newValues);
    };

    const handleAddMore = () => {
        setValues([...values, {
            Date: '',
            Description: '',
            Job_NO: '',
            Supplier: "",
            cost: '',
            Authority: ''
        }]);
    };

    return (
        <div className='formContainer'>
            <div className='formTitle'>
                <label>Out Source</label>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-Multi-btn'>
                    <label>Out Source:</label>
                    <button type='button' onClick={handleAddMore}>Add More</button>
                </div>
                {values.map((value, index) => (
                    <div key={index} className='dateGroup'>
                        <div className='formGroup'>
                            <label className='label'>Date:</label>
                            <input className='input' type='date' name='Date' value={value.Date} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='formGroup'>
                            <label className='label'>Description:</label>
                            <input className='input' type='text' name='Description' value={value.Description} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='formGroup'>
                            <label className='label'>Job_NO:</label>
                            <input className='input' type='text' name='Job_NO' value={value.Job_NO} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='formGroup'>
                            <label className='label'>Supplier:</label>
                            <input className='input' type='text' name='Supplier' value={value.Supplier} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='formGroup'>
                            <label className='label'>Cost:</label>
                            <input className='input' type='text' name='cost' value={value.cost} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div className='formGroup'>
                            <label className='label'>Authority:</label>
                            <input className='input' type='text' name='Authority' value={value.Authority} onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                ))}
                <div className='form-Imp-btn'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default OutSource;
