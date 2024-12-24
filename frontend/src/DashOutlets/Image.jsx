import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './dashout.css';

const Initial = () => {
  const { id } = useParams(); // 'id' from the URL
  const [files, setFiles] = useState([]); // Array to hold multiple files
  const [customName, setCustomName] = useState('');
  const [previews, setPreviews] = useState([]); // Array to hold preview URLs
  const [previewaft, setPreviewaft] = useState([]); // Array to hold preview URLs after upload

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview URLs for the selected images
    const objectUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);
  };

  const handleNameChange = (e) => {
    setCustomName(e.target.value);
  };

  // Fetch images by id
  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/images/inimages/${id}`);
      console.log('Fetched Images:', response.data); // Log the fetched images for debugging
      setPreviewaft(response.data); // Set the fetched images to previewaft state
    } catch (error) {
      console.error('There was an error fetching the images!', error);
    }
  }, [id]);

  useEffect(() => {
    fetchImages();
  }, [id, fetchImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !customName) {
      alert("Please provide both files and a custom name.");
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); // Use 'images' for the input name as per your backend
    });
    formData.append('customName', customName);

    try {
      const response = await axios.post(`http://localhost:8081/api/images/uploadImg/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Files uploaded successfully");
      console.log('Upload Response:', response.data); // Log the upload response for debugging
      setPreviews([]); // Clear previews after upload
      setFiles([]); // Clear files input after upload
      setCustomName(''); // Clear custom name input after upload
      fetchImages(); // Fetch images after upload to update previewaft
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files");
    }
  };

  const handleDelete = async (id) => {
  console.log(`Attempting to delete image with id: ${id}`); // Debugging line
  try {
    await axios.delete(`http://localhost:8081/api/images/delete/${id}`);
    alert("Image deleted successfully");
    fetchImages(); // Refresh the list of images after deletion
  } catch (error) {
    console.error("Error deleting image:", error);
    alert("Failed to delete image");
  }
};


  return (
    <div className='formContainer-imp'>
      <form onSubmit={handleSubmit} className='form'>
      <h2 className='formTitle'>Initial Images</h2>
        <div className='formGroup'>
          <label className='label'>Custom Name:</label>
          <input className='input' type="text" value={customName} onChange={handleNameChange} />
        </div>
        <div className='formGroup'>
          <label className='label'>Files:</label>
          <input className='input' type="file" onChange={handleFileChange} multiple />
        </div>
        {/* {previews.length > 0 && (
          <div className='image-preview'>
            <h3>Preview:</h3>
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto', margin: '5px' }} />
            ))}
          </div>
        )} */}
        <div className='form-Imp-btn'>
          <button type="submit">Upload</button>
        </div>
      </form>
      {/* {previewaft.length > 0 && (
        <div className='image-preview'>
          <h3>Preview after Upload:</h3>
          {previewaft.map((image, index) => (
            <div key={index} className='image-container'>
              <img
                src={`data:${image.fileType};base64,${image.fileData}`}
                alt={image.customName}
                className='resourceImage'
                style={{ width: '100%', height: 'auto', margin: '5px' }}
              />
              <button onClick={() => handleDelete(image.id)}>Delete</button>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Initial;