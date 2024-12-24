import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './dashout.css';

function UserInfo() {
    const [fields, setFields] = useState([{ title: '', content: '' }]);
    const { id } = useParams();
    const book_id = id;
    const [data, setData] = useState([]);

    const handleAddMore = () => {
        setFields([...fields, { title: '', content: '' }]);
    };

    const handleInputChange = (index, event) => {
        const newFields = [...fields];
        newFields[index][event.target.name] = event.target.value;
        setFields(newFields);
    };

    // Fetch data /use/:book_id
    useEffect(() => {
    axios.get(`http://localhost:8081/api/userdet/use/${book_id}`)
        .then(response => {
            console.log('Fetched Data:', response.data);
            const fetchedFields = response.data.map((field) => ({
                title: field.title,
                content: field.content,
                createdAt: field.createdAt ? new Date(field.createdAt).toLocaleDateString() : 'N/A' // Check and format date
            }));
            setData(fetchedFields);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
}, [book_id]);


    const handleSubmit = (event) => {
        event.preventDefault();
        // Wrap fields in userInfo and include book_id in the request body
        axios.post(`http://localhost:8081/api/userdet/use/${book_id}`, { userInfo: fields })
            .then(response => {
                console.log('Submission Response:', response.data);
                alert('User information submitted successfully');
                // Fetch the updated data after submission
                
            })
            .catch(error => {
                console.error('There was an error submitting the data!', error);
            });
    };

    return (
        <div className='formContainer-imp'>
            <div className='formTitle'>User Information</div>
            <form onSubmit={handleSubmit}>
                <div className='form-Multi-btn'>
                    <label>Details</label>
                    <button type='button' onClick={handleAddMore}>Add More</button>
                </div>
                {fields.map((field, index) => (
                    <div key={index} className='formGroup'>
                        <label className='label'>Title {index + 1}:</label>
                        <input
                            type='text'
                            className='input'
                            name='title'
                            value={field.title}
                            onChange={e => handleInputChange(index, e)}
                        />
                        <label className='label'>Content {index + 1}:</label>
                        <input
                            type='text'
                            className='input'
                            name='content'
                            value={field.content}
                            onChange={e => handleInputChange(index, e)}
                        />
                    </div>
                ))}
                <div className='form-Imp-btn'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <table className='dataTable'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((field, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{field.title}</td>
                            <td>{field.content}</td>
                            <td>{field.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserInfo;