import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { useCallback } from 'react';
function Dashright() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [estImages, setEstImages] = useState([]);
    const [impImages, setImpImages] = useState([]);
    const [compImages, setCompImages] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // For the clicked image
    const [selectedPdf, setSelectedPdf] = useState(null); // For the clicked PDF
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [resources, setResources] = useState([]);
  const [selectedresImage, setSelectedresImage] = useState(''); // For the clicked image

    // Fetch logbook data
    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/logbook/log/${id}`, { withCredentials: true })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError('An error occurred. Please try again.');
                console.error('Error fetching data:', err);
            });
    }, [id]);

    // Fetch completion images
    useEffect(() => {
        if (data) {
            const fetchCompImages = async () => {
                try {
                    const res = await axios.get(`http://localhost:8081/api/comp/images/${id}`);
                    const formattedImages = res.data.map((image, index) => ({
                        src: `data:${image.fileType};base64,${image.fileData}`,
                        fileName: image.fileName,
                        label: `Completion ${index + 1}`,
                    }));
                    setCompImages(formattedImages);
                } catch (err) {
                    console.error('Error fetching completion images:', err);
                    setError('Error fetching completion images.');
                }
            };
            fetchCompImages();
        }
    }, [id, data]);

    // Fetch implementation images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:8081/api/imp/images/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status !== 200) {
                    throw new Error(`Error fetching images: ${response.statusText}`);
                }

                const fetchedImages = response.data.map((image, index) => ({
                    src: `data:${image.fileType};base64,${btoa(String.fromCharCode(...new Uint8Array(image.fileData.data)))}`,
                    label: `Implement ${index + 1}`,
                }));

                setImpImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching implementation images:', error);
                setError('Error fetching implementation images.');
            }
        };

        fetchImages();
    }, [id]);

    // Fetch estimation images
    useEffect(() => {
        const fetchEstImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/est/images/${id}`);
                setEstImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            }
        };
        fetchEstImages();
    }, [id]);
useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
      setResources(response.data); // Store resources only once
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  };

  fetchResources();
}, [id]);

//   useEffect(() => {
//     fetchResources();
//   }, [id, updateTrigger, fetchResources]); // Include fetchResources in the dependency array

    // Fetch attachments
    useEffect(() => {
        const fetchAttachments = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
                setAttachments(response.data);
            } catch (error) {
                console.error('Error fetching attachments:', error);
                setError('Failed to fetch attachments.');
            }
        };
        fetchAttachments();
    }, [id]);

    // Handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const handleImageClickres = (resource) => {
    setSelectedresImage(`data:${resource.fileType};base64,${resource.fileData}`);
    setShowModal(true);
    setSelectedPdf(null); // Clear selected PDF
    // setSelectedImage(null); 
  };
    // Handle PDF click
    const handlePdfClick = (pdf) => {
        const pdfUrl = `data:${pdf.fileType};base64,${pdf.fileData}`;
        setSelectedPdf({
            url: pdfUrl,
            fileName: pdf.fileName
        });
        setSelectedImage(null);
        setShowModal(true);
    };

    // Ensure `data` is not null before destructuring
    const checklistImages = data?.checklistImages || [];
    const crosscheckImages = data?.crosscheckImages || [];

    const images = [
        ...checklistImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Checklist' })),
        ...crosscheckImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Logbook' }))
    ];
    const { quotationImages = [], estimateImages = [] } = estImages;

    const imageArray = [
        ...quotationImages.map((image) => ({
            src: `data:${image.fileType};base64,${image.fileData}`,
            label: 'Quotation',
        })),
        ...estimateImages.map((image) => ({
            src: `data:${image.fileType};base64,${image.fileData}`,
            label: 'Estimation',
        })),
    ];
    const handleDelete = async (id) => {
        try {
         await axios.delete(`http://localhost:8081/api/attachment/resource/${id}`);
        //  await axios.delete(`http://localhost:8081/api/comp/comp/${resourceId}`);

        alert('Resource deleted successfully');
        setUpdateTrigger(!updateTrigger); // Trigger re-fetch to update list
        } catch (error) {
        console.error('There was an error deleting the resource!', error);
        }
    };
    const handleDeletecomp = async (id) => {
        try {
        //  await axios.delete(`http://localhost:8081/api/attachment/resource/${resourceId}`);
         await axios.delete(`http://localhost:8081/api/comp/image/${id}`);

        alert('Resource deleted successfully');
        setUpdateTrigger(!updateTrigger); // Trigger re-fetch to update list
        } catch (error) {
        console.error('There was an error deleting the resource!', error);
        }
    };
    return (
        <div className='sticky-top min-vh-100 overflow-auto'>
        <div className=''>
            <h4 className='d-flex m-3 justify-content-center'>Views</h4>
            <div className='mt-4'>
                <h5>Registration</h5>
                <div className="d-flex flex-column gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className="btn btn-link text-start"
                            onClick={() => setSelectedImage(image)}
                        >
                            {image.label} {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-3">
                <h5>Estimation</h5>
                <div className="d-flex flex-wrap gap-3">
                    {imageArray.map((image, index) => (
                        <button
                            key={index}
                            className="btn btn-link text-start"
                            onClick={() => handleImageClick(image)}
                        >
                            {image.label} {index + 1}
                        </button>
                    ))}
                    {imageArray.length === 0 && <p>No estimation images available.</p>}
                </div>
            </div>
            <div className='mt-3'>
                <h5>Implement</h5>
                <div className="d-flex flex-wrap gap-3">
                    {(impImages || []).map((image, index) => (
                        <div key={index} className="image-preview">
                            <button
                                className="btn btn-link text-start"
                                onClick={() => setSelectedImage(image)}
                            >
                                {image.label}
                            </button>
                        </div>
                    ))}
                    {impImages.length === 0 && <p>No implementation images available.</p>}
                </div>
            </div>
            <div className='mt-3'>
                <h5>Completion</h5>
                <div className="d-flex flex-wrap gap-3">
                    {compImages.map((image, index) => (
                        <div key={index} className="image-preview">
                            <button
                                className="btn btn-link text-start"
                                onClick={() => setSelectedImage(image)}
                            >
                                {image.label}
                            </button>
                            <FaRegTrashCan className='danger' onClick={() => handleDeletecomp(compImages.id)} />

                        </div>
                    ))}

                </div>
            </div>
            <div className='mt-3'>
                <h5>Attachments</h5>
                <div className="d-flex flex-wrap gap-3">
                    {/* <div className="resourcesList"> */}
                    <table>
                    <tbody>
                    {resources.map((resource) => (
                        <tr key={resource.id} className="resourceItem">
                        {resource.fileType.startsWith('image/') ? (
                            <td className="btn btn-link text-start" onClick={() => handleImageClickres(resource)}>
                                {resource.fileName}
                            </td>
                        ) : resource.fileType === 'application/pdf' ? (
                            <td
                                className="btn btn-link text-start"
                                onClick={() => handlePdfClick(resource)}
                            >
                                {resource.fileName}
                            </td>
                        ) : (
                            <p>Unsupported file type</p>
                        )}
                        <td>
                        <FaRegTrashCan className='danger' onClick={() => handleDelete(resource.id)} />
                        </td>
                    </tr>
                        
                    ))}
                    </tbody>
                    </table>
                    {/* </div> */}
                </div>
            </div>
            {selectedImage && (
                <div className="image-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setSelectedImage(null)}>
                            &times;
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.label}
                            className="img-fluid"
                            style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
                        />
                        <p className="text-center mt-3">{selectedImage.label}</p>
                    </div>
                </div>
            )}
           {selectedPdf && (
    <div className="pdf-modal">
        <div className="pdf-modal-content">
            <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold">{selectedPdf.fileName}</h3>
                <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedPdf(null)}
                >
                    ×
                </button>
            </div>
            <iframe
                src={selectedPdf.url}
                title={selectedPdf.fileName}
                type="application/pdf"
                className="pdf-viewer"
                style={{
                    width: '100%',      // Set width to full
                    maxHeight: '80vh',  // Set a maximum height for responsiveness
                    border: 'none', 
                    objectFit: 'contain'
                }}
            />
        </div>
    </div>
)}

            {selectedresImage && (
          <div className="image-modal">
            <div className="modal-content" >
                <button className="close-button" onClick={() => { setSelectedresImage(null); setSelectedImage(null); }}>
                            &times;
                        </button>
              <img
                src={selectedresImage}
                alt="Preview"
                style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
              />
              {/* <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button> */}
            </div>
          </div>
        )}
        </div>
        </div>
    );
}

export default Dashright;

