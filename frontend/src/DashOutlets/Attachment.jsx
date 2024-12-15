import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Attachment = () => {
  const { id } = useParams(); // 'id' from the URL
  const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState('');
  const [resources, setResources] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/resource/resources/${id}`);
      setResources(response.data);
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [id, updateTrigger]); // Add updateTrigger here

  const handleNameChange = (e) => {
    setCustomName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('customName', customName);

    try {
      await axios.post(`http://localhost:8081/api/resource/upload/${id}`, formData);
      alert('File uploaded successfully');
      setUpdateTrigger(!updateTrigger); // Toggle the update trigger to re-fetch resources
      setCustomName(''); // Reset custom name
      setFile(null); // Reset file input

      // Directly re-fetch resources to update immediately
      fetchResources();
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  // Delete resource
const handleDelete = async (id) => {
    console.log('Deleting resource with ID:', id); // Log the ID for debugging
    try {
        await axios.delete(`http://localhost:8081/api/resource/resource/${id}`); // Fixed URL here
        alert('Resource deleted successfully');
        setUpdateTrigger(!updateTrigger); // Trigger re-fetch to update list
    } catch (error) {
        console.error('There was an error deleting the resource!', error);
    }
};



  return (
    <div className='formContainer-com'>
      <h2 className='formTitle'>Attachments</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='formGroup'>
          <label className='label'>Custom Name:</label>
          <input
            className='input'
            type="text"
            value={customName}
            onChange={handleNameChange}
          />
        </div>
        <div className='formGroup'>
          <label className='label'>File:</label>
          <input
            className='input'
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className='form-Imp-btn'>
          <button className='submitButton' type="submit">Upload</button>
        </div>
      </form>
      <div className='resourcesList'>
        {resources.map(resource => (
          <div key={resource.id} className='resourceItem'>
            <h3>{resource.customName}</h3>
            {resource.fileType.startsWith('image/') ? (
              <img
                src={`data:${resource.fileType};base64,${resource.fileData}`}
                alt={resource.customName}
                className='resourceImage'
              />
            ) : resource.fileType === 'application/pdf' ? (
              <iframe
                src={`data:${resource.fileType};base64,${resource.fileData}`}
                title={resource.customName}
                className='resourcePdf'
                width="100%"
                height="500px"
              />
            ) : (
              <p>Unsupported file type</p>
            )}
            <button
              className='deleteButton'
              onClick={() => handleDelete(resource.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attachment;
