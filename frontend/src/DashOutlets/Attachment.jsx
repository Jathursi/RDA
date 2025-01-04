// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Attachment = () => {
//   const { id } = useParams(); // 'id' from the URL
//   const [files, setFiles] = useState([]);
//   const [customName, setCustomName] = useState('');
//   const [resources, setResources] = useState([]);
//   const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [modalImage, setModalImage] = useState(null); // State to store the image for the modal

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const fetchResources = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
//       setResources(response.data);
//     } catch (error) {
//       console.error('There was an error fetching the resources!', error);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchResources();
//   }, [id, updateTrigger, fetchResources]);

//   const handleNameChange = (e) => {
//     setCustomName(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!customName) {
//       setError('Custom name is required');
//       return;
//     }

//     const existingNames = resources.map(resource => resource.fileName);
//     if (existingNames.includes(customName)) {
//       setError('A file with this name already exists');
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file, index) => {
//       formData.append('files', file);
//     });
//     formData.append('customName', customName);

//     try {
//       await axios.post(`http://localhost:8081/api/attachment/upload/${id}`, formData);
//       alert('Files uploaded successfully');
//       setUpdateTrigger(!updateTrigger); // Toggle the update trigger to re-fetch resources
//       setCustomName(''); // Reset custom name
//       setFiles([]); // Reset file input
//       fetchResources();
//     } catch (error) {
//       console.error('There was an error uploading the files!', error);
//     }
//   };

//   const handleDelete = async (resourceId) => {
//     try {
//       await axios.delete(`http://localhost:8081/api/attachment/resource/${resourceId}`);
//       alert('Resource deleted successfully');
//       setUpdateTrigger(!updateTrigger); // Trigger re-fetch to update list
//     } catch (error) {
//       console.error('There was an error deleting the resource!', error);
//     }
//   };

//   const openModal = (fileData, fileType) => {
//     setModalImage({ fileData, fileType });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalImage(null);
//   };

//   return (
//     <div className="template d-flex align-items-center 100-w sm:w-100">
//       <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
//         <form onSubmit={handleSubmit}>
//           <h2 className="formTitle pb-2 sm:pb-5">Attachments</h2>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="mb-3 row">
//             <label className="col-sm-2 col-form-label">Custom Name:</label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customName}
//                 onChange={handleNameChange}
//               />
//             </div>
//           </div>
//           <div className="mb-3 row">
//             <label className="col-sm-2 col-form-label">Files:</label>
//             <div className="col-sm-10">
//               <input
//                 type="file"
//                 className="form-control"
//                 multiple
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary">
//               Upload
//             </button>
//           </div>
//         </form>
//         {/* <div className="resourcesList">
//           {resources.map((resource) => (
//             <div key={resource.id} className="resourceItem">
//               <h3>{resource.fileName}</h3>
//               {resource.fileType.startsWith('image/') ? (
//                 <img
//                   src={`data:${resource.fileType};base64,${resource.fileData}`}
//                   alt={resource.fileName}
//                   className="resourceImage"
//                   onClick={() => openModal(resource.fileData, resource.fileType)} // Open modal on click
//                 />
//               ) : resource.fileType === 'application/pdf' ? (
//                 <iframe
//                   src={`data:${resource.fileType};base64,${resource.fileData}`}
//                   title={resource.fileName}
//                   className="resourcePdf"
//                   width="100%"
//                   height="500px"
//                 />
//               ) : (
//                 <p>Unsupported file type</p>
//               )}
//               <button
//                 className="deleteButton"
//                 onClick={() => handleDelete(resource.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Modal for image preview 
//         {showModal && modalImage && (
//           <div className="modal" onClick={closeModal}>
//             <div className="modalContent" onClick={(e) => e.stopPropagation()}>
//               <button className="closeButton" onClick={closeModal}>
//                 &times;
//               </button>
//               <img
//                 src={`data:${modalImage.fileType};base64,${modalImage.fileData}`}
//                 alt="Preview"
//                 className="modalImage"
//               />
//             </div>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Attachment;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import img from '../Assets/pdf.webp';

const Attachment = () => {
  const { id } = useParams(); // 'id' from the URL
  const [files, setFiles] = useState([]);
  const [customName, setCustomName] = useState('');
  const [resources, setResources] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalImage, setModalImage] = useState(null); // State to store the image for the modal

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const fetchResources = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
      setResources(response.data);
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  }, [id]);

  useEffect(() => {
    fetchResources();
  }, [id, updateTrigger, fetchResources]);

  const handleNameChange = (e) => {
    setCustomName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!customName) {
      setError('Custom name is required');
      return;
    }

    const existingNames = resources.map((resource) => resource.fileName);
    if (existingNames.includes(customName)) {
      setError('A file with this name already exists');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('customName', customName);

    try {
      await axios.post(`http://localhost:8081/api/attachment/upload/${id}`, formData);
      alert('Files uploaded successfully');
      setUpdateTrigger(!updateTrigger); // Toggle the update trigger to re-fetch resources
      setCustomName(''); // Reset custom name
      setFiles([]); // Reset file input
      fetchResources();
    } catch (error) {
      console.error('There was an error uploading the files!', error);
    }
  };

  const handleDelete = async (resourceId) => {
    try {
      await axios.delete(`http://localhost:8081/api/attachment/resource/${resourceId}`);
      alert('Resource deleted successfully');
      setUpdateTrigger(!updateTrigger); // Trigger re-fetch to update list
    } catch (error) {
      console.error('There was an error deleting the resource!', error);
    }
  };

  const openModal = (fileData, fileType) => {
    setModalImage({ fileData, fileType });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className="template d-flex align-items-center w-100">
      <div className="w-100 p-2 mx-1">
        <form onSubmit={handleSubmit}>
          <h2 className="formTitle pb-2">Attachments</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Custom Name:</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={customName}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Files:</label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </div>
        </form>
        <div className="resourcesList mt-4 d-flex flex-wrap gap-3">
          {resources.map((resource) => (
            <div key={resource.id} className="resourceItem">
              <div
                className="thumbnail"
                style={{
                  width: '100px',
                  height: '100px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
                onClick={() =>
                  resource.fileType.startsWith('image/')
                    ? openModal(resource.fileData, resource.fileType)
                    : window.open(
                        `data:${resource.fileType};base64,${resource.fileData}`,
                        '_blank'
                      )
                }
              >
                {resource.fileType.startsWith('image/') ? (
                  <img
                    src={`data:${resource.fileType};base64,${resource.fileData}`}
                    alt={resource.fileName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : resource.fileType === 'application/pdf' ? (
                  <img
                    src={img} // Replace this with the actual path to your PDF logo
                    alt="PDF"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <p>Unsupported</p>
                )}
              </div>
              <p className="text-center mt-1">{resource.fileName}</p>
              <button
                className="btn btn-danger btn-sm mt-1"
                onClick={() => handleDelete(resource.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* Modal for image preview */}
        {showModal && modalImage && (
          <div className="modal" onClick={closeModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeButton" onClick={closeModal}>
                &times;
              </button>
              <img
                src={`data:${modalImage.fileType};base64,${modalImage.fileData}`}
                alt="Preview"
                className="modalImage"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attachment;

