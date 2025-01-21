
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// // import { FaRegTrashCan } from "react-icons/fa6";
// import img from '../Assets/pdf.webp';

// function Dashright() {
//     const { id } = useParams();
//     const [data, setData] = useState(null);
//     const [outimage, setOutimage] = useState(null);
//     const [estImages, setEstImages] = useState([]);
//     const [impImages, setImpImages] = useState([]);
//     const [compImages, setCompImages] = useState([]);
//     // const [error, setError] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null); // For the clicked image
//     const [selectedPdf, setSelectedPdf] = useState(null); // For the clicked PDF
//     // const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger re-fetch
//     // const [showModal, setShowModal] = useState(false); // State to handle modal visibility
//     const [resources, setResources] = useState([]);
//     const [selectedresImage, setSelectedresImage] = useState(''); // For the clicked image
//     const [selectedoutImage, setSelectedoutImage] = useState(''); // For the clicked image
//     const [supImages, setsupImages] = useState([]); // For the clicked image

//     useEffect(() => {
//         axios
//         .get(`http://localhost:8081/api/logbook/log/${id}`, { withCredentials: true })
//         .then((response) => {
//         setData(response.data);
//         })
//         .catch((err) => {
//             // setError('An error occurred. Please try again.');
//             console.error('Error fetching data:', err);
//         });
//     }, [id]);

// // Fetch completion images
//     useEffect(() => {
//     if (data) {
//     const fetchCompImages = async () => {
//     try {
//     const res = await axios.get(`http://localhost:8081/api/comp/images/${id}`);
//     const formattedImages = res.data.map((image, index) => ({
//     id: image.id, // Ensure the id is included
//     src: `data:${image.fileType};base64,${image.fileData}`,
//     fileName: image.fileName,
//     label: `Completion ${index + 1}`,
//     }));
//     setCompImages(formattedImages);
//     } catch (err) {
//     console.error('Error fetching completion images:', err);
//     // setError('Error fetching completion images.');
//     }
//     };
//     fetchCompImages();
//     }
//     }, [id, data]);

// // Fetch implementation images
//     useEffect(() => {
//     const fetchImages = async () => {
//     try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//     throw new Error('No token found');
//     }

//     const response = await axios.get(`http://localhost:8081/api/imp/images/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     });

//     if (response.status !== 200) {
//     throw new Error(`Error fetching images: ${response.statusText}`);
//     }

//     const fetchedImages = response.data.map((image, index) => ({
//                     src: `data:${image.fileType};base64,${image.fileData.data}`, // Use if already Base64
//                     label: `Implement ${index + 1}`,
//                 }));

//     setImpImages(fetchedImages);
//     } catch (error) {
//     console.error('Error fetching implementation images:', error);
//     // setError('Error fetching implementation images.');
//     }
//     };

//     fetchImages();
//     }, [id]);

// // Fetch estimation images
//     useEffect(() => {
//     const fetchEstImages = async () => {
//     try {
//     const response = await axios.get(`http://localhost:8081/api/est/images/${id}`);
//     setEstImages(response.data);
//     } catch (error) {
//     console.error('Error fetching images:', error);
//     // setError('Failed to fetch images.');
//     }
//     };
//     fetchEstImages();
//     }, [id]);

//     useEffect(() => {
//     const fetchResources = async () => {
//     try {
//     const response = await axios.get(`http://localhost:8081/api/attachment/resources/${id}`);
//     setResources(response.data); // Store resources only once
//     } catch (error) {
//     console.error('There was an error fetching the resources!', error);
//     }
//     };

//     fetchResources();
//     }, [id]);

// // Fetch attachments
// // Handle image click
//     const handleImageClick = (image) => {
//     setSelectedImage(image);
//     };

//     const handleImageClickres = (resource) => {
//     setSelectedresImage(`data:${resource.fileType};base64,${resource.fileData}`);
//     // setShowModal(true);
//     setSelectedPdf(null); // Clear selected PDF
//     };

//     const handleImageClickout = (image) => {
//     setSelectedoutImage(image);
//     setSelectedPdf(null); // Clear selected PDF
//     };

//     useEffect(() => {
//     axios
//     .get(`http://localhost:8081/api/out/Outview/${id}`, { withCredentials: true })
//     .then((response) => {
//     setOutimage(response.data);
//     })
//     .catch((err) => {
//     // setError('An error occurred. Please try again.');
//     console.error('Error fetching data:', err);
//     });
//     }, [id]);

// // Handle PDF click
//     const handlePdfClick = (pdf) => {
//     const pdfUrl = `data:${pdf.fileType};base64,${pdf.fileData}`;
//     setSelectedPdf({
//     url: pdfUrl,
//     fileName: pdf.fileName
//     });
//     setSelectedImage(null);
//     // setShowModal(true);
//     };

//     // useEffect(() => {
//     // const fetchSupImages = async () => {
//     // try {
//     // const response = await axios.get(`http://localhost:8081/api/sup/images/${id}`);
//     // setsupImages(response.data);
//     // } catch (error) {
//     // console.error('Error fetching images:', error);
//     // // setError('Failed to fetch images.');
//     // }
//     // };
//     // fetchSupImages();
//     // }, [id]);

// // Ensure `data` is not null before destructuring
//     const checklistImages = data?.checklistImages || [];
//     const crosscheckImages = data?.crosscheckImages || [];

//     const images = [
//     ...checklistImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Checklist', id: image.id })),
//     ];
//     const images1 = [
//     ...crosscheckImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Logbook', id: image.id }))
//     ];

//     const { quotationImages = [], estimateImages = [] } = estImages;

//     const imageArray = [
//     ...quotationImages.map((image) => ({
//     src: `data:${image.fileType};base64,${image.fileData}`,
//     label: 'Quotation',
//     })),
//     ];
//     const imageEstArray = [
//         ...estimateImages.map((image) => ({
//     src: `data:${image.fileType};base64,${image.fileData}`,
//     label: 'Estimation',
//     })),
//     ];

//     const { image1 } = outimage || {};

//     const imageArray1 = (image1 || []).map((image, index) => ({
//     id: image.id, // Include the ID here
//     src: `data:${image.fileType};base64,${image.fileData}`,
//     label: `OutSource ${index + 1}`,
//     }));
//     // const { quotationImages1 = [], estimateImages1 = [] } = supImages;

//     // const imageArray2 = [
//     // ...quotationImages1.map((image) => ({
//     // src: `data:${image.fileType};base64,${image.fileData}`,
//     // label: 'Quotation',
//     // })),
//     // ];
//     // const imageArray3 = [
//     //     ...estimateImages1.map((image) => ({
//     // src: `data:${image.fileType};base64,${image.fileData}`,
//     // label: 'Estimation',
//     // })),
//     // ];

//     return (
//         <div className='sticky-top min-vh-100 overflow-auto sticky-top'>
//             <div className=''>
//                 <h4 className='d-flex m-3 justify-content-center'>Views</h4>
//                 <div className='mt-4'>
//                     <h5>Registration</h5>
//                     <div className="d-flex flex-wrap ">
//                         {images.map((image, index) => (
//                             <div
//                                 key={index}
//                                 className="thumbnail"
//                                 style={{
//                                 cursor: 'pointer',
//                                 width: '70px',
//                                 height: '70px',
//                                 overflow: 'hidden',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '5px'
//                                 }}
//                                 onClick={() => setSelectedImage(image)}
//                             >
//                                 <img
//                                     src={image.src}
//                                     alt={image.label}
//                                     style={{
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover'
//                                     }}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="d-flex flex-wrap">
//                         {images1.map((image, index) => (
//                             <div
//                                 key={index}
//                                 className="thumbnail"
//                                 style={{
//                                 cursor: 'pointer',
//                                 width: '70px',
//                                 height: '70px',
//                                 overflow: 'hidden',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '5px'
//                                 }}
//                                 onClick={() => setSelectedImage(image)}
//                             >
//                                 <img
//                                     src={image.src}
//                                     alt={image.label}
//                                     style={{
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover'
//                                     }}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="mt-3">
//                     <h5>Estimation</h5>
//                     <h6>vechilce condition</h6>
//                     <div className="d-flex flex-wrap">
//                         {imageEstArray.map((image, index) => (
//                             <div key={index} className="image-preview">
//                                 <button
//                                     key={index}
//                                     className="thumbnail"
//                                     style={{
//                                         cursor: 'pointer',
//                                         width: '70px',
//                                         height: '70px',
//                                         overflow: 'hidden',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '5px'
//                                     }}
//                                     onClick={() => handleImageClick(image)}
//                                 >
//                                 {/* {image.label} {index + 1}
//                                 */}
//                                     <img
//                                         src={image.src}
//                                         alt={image.label}
//                                         style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover'
//                                     }}
//                                     />
//                                 </button>
//                             </div>
//                         ))}
//                     {/* </div> */}
//                         {/* {imageArray.length === 0 && <p>No estimation images available.</p>} */}
//                     </div>
//                     <h6>quotationImg</h6>
//                     <div className="d-flex flex-wrap">
//                         {imageArray.map((image, index) => (
//                             <div key={index} className="image-preview">
//                                 <button
//                                     key={index}
//                                     className="thumbnail"
//                                     style={{
//                                         cursor: 'pointer',
//                                         width: '70px',
//                                         height: '70px',
//                                         overflow: 'hidden',
//                                         border: '1px solid #ddd',
//                                         borderRadius: '5px'
//                                     }}
//                                     onClick={() => handleImageClick(image)}
//                                 >
//                                 {/* {image.label} {index + 1}
//                                 */}
//                                     <img
//                                         src={image.src}
//                                         alt={image.label}
//                                         style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover'
//                                     }}
//                                     />
//                                 </button>
//                             </div>
//                         ))}
//                     {/* </div> */}
//                         {/* {imageArray.length === 0 && <p>No estimation images available.</p>} */}
//                     </div>
//                 </div>
//                 <div className='mt-3'>
//                 <h5>Implement</h5>
//                 <div className="d-flex flex-wrap">
//                 {(impImages || []).map((image, index) => (
//                 <div key={index} className="image-preview">
//                 <button
//                 className="thumbnail"
//                 style={{
//                 cursor: 'pointer',
//                 width: '70px',
//                 height: '70px',
//                 overflow: 'hidden',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px'
//                 }}
//                 onClick={() => setSelectedImage(image)}
//                 >
//                 {/* {image.label} */}
//                 <img
//                 src={image.src}
//                 alt={image.label}
//                 style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover'
//                 }}
//                 />
//                 </button>
//                 </div>
//                 ))}
//                 {/* {impImages.length === 0 && <p>No implementation images available.</p>} */}
//                 </div>
//                 </div>
//                 <div className='mt-3'>
//                 <h5>Completion</h5>
//                 <div className="d-flex flex-wrap">
//                 {compImages.map((image, index) => (
//                 <div key={index} className="image-preview">
//                 <button
//                 className="thumbnail"
//                 style={{
//                 cursor: 'pointer',
//                 width: '70px',
//                 height: '70px',
//                 overflow: 'hidden',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px'
//                 }}
//                 onClick={() => setSelectedImage(image)}
//                 >
//                 {/* {image.label} */}
//                 <img
//                 src={image.src}
//                 alt={image.label}
//                 style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover'
//                 }}
//                 />
//                 </button>
//                 </div>
//                 ))}
//                 </div>
//                 </div>
//                 <div className='mt-3'>
//                 <h5>Attachments</h5>
//                 <div className="d-flex flex-wrap">
//                 {resources.map((resource) => (
//                 <div key={resource.id} className="resourceItem">
//                 {resource.fileType.startsWith('image/') ? (
//                 <div className="thumbnail"
//                 style={{
//                 cursor: 'pointer',
//                 width: '70px',
//                 height: '70px',
//                 overflow: 'hidden',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px'
//                 }}
//                 onClick={() => handleImageClickres(resource)}>
//                 {/* {resource.fileName} */}
//                 <img
//                 src={`data:${resource.fileType};base64,${resource.fileData}`}
//                 alt={resource.fileName}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 />
//                 </div>
//                 ) : resource.fileType === 'application/pdf' ? (
//                 <div 
//                     className="thumbnail"
//                     onClick={() => handleImageClickres(resource)}
//                 >
//                 <img
//                     src={img} // Replace this with the actual path to your PDF logo
//                     alt={resource.fileName}
//                     style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//                 />
//                 </div>
//                 ) : (
//                 <p>Unsupported file type</p>
//                 )}
//                 </div>
//                 ))}
//                 </div>
//                 </div>
//                 <div className='mt-3'>
//                 <h5>Out Source</h5>
//                 <div className="d-flex flex-wrap">
//                 {imageArray1.map((image, index) => (
//                 <div key={index}>
//                 <button
//                 className="thumbnail"
//                 style={{
//                 cursor: 'pointer',
//                 width: '70px',
//                 height: '70px',
//                 overflow: 'hidden',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px'
//                 }}
//                 onClick={() => handleImageClickout(image.src)}
//                 >
//                 {/* {image.label} */}
//                 <img
//                 src={image.src}
//                 alt={image.label}
//                 style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover'
//                 }}
//                 />
//                 </button>
//                 </div>
//                 ))}


//                 </div>
//                 </div>
//                 {selectedImage && (
//                 <div className="image-modal">
//                 <div className="modal-content">
//                 <button className="close-button" onClick={() => setSelectedImage(null)}>
//                 &times;
//                 </button>
//                 <img
//                 src={selectedImage.src}
//                 alt={selectedImage.label}
//                 className="img-fluid"
//                 style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
//                 />
//                 <p className="text-center mt-3">{selectedImage.label}</p>
//                 </div>
//                 </div>
//                 )}
//                 {selectedPdf && (
//                 <div className="pdf-modal">
//                 <div className="pdf-modal-content">
//                 <div className="flex justify-between mb-2">
//                 <h3 className="text-lg font-semibold">{selectedPdf.fileName}</h3>
//                 <button 
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={() => setSelectedPdf(null)}
//                 >
//                 ×
//                 </button>
//                 </div>
//                 <iframe
//                 src={selectedPdf.url}
//                 title={selectedPdf.fileName}
//                 type="application/pdf"
//                 className="pdf-viewer"
//                 style={{
//                 width: '100%',      // Set width to full
//                 maxHeight: '80vh',  // Set a maximum height for responsiveness
//                 border: 'none', 
//                 objectFit: 'contain'
//                 }}
//                 />
//                 </div>
//                 </div>
//                 )}
//                 {selectedoutImage && (
//                 <div className="image-modal">
//                 <div className="modal-content">
//                 <button className="close-button" onClick={() => setSelectedoutImage(null)}>
//                 &times;
//                 </button>
//                 <img
//                 src={selectedoutImage}
//                 alt="Preview"
//                 style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
//                 />
//                 </div>
//                 </div>
//                 )}
//                 {selectedresImage && (
//                 <div className="image-modal">
//                 <div className="modal-content" >
//                 <button className="close-button" onClick={() => { setSelectedresImage(null); setSelectedImage(null); }}>
//                 &times;
//                 </button>
//                 <img
//                 src={selectedresImage}
//                 alt="Preview"
//                 style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
//                 />
//                 </div>
//                 </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Dashright;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import img from '../Assets/pdf.webp';

function Dashright() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [outimage, setOutimage] = useState(null);
    const [estImages, setEstImages] = useState([]);
    const [impImages, setImpImages] = useState([]);
    const [compImages, setCompImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // For the clicked image
    const [selectedPdf, setSelectedPdf] = useState(null); // For the clicked PDF
    const [resources, setResources] = useState([]);
    const [selectedresImage, setSelectedresImage] = useState(''); // For the clicked image
    const [selectedoutImage, setSelectedoutImage] = useState(''); // For the clicked image

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/logbook/log/${id}`, { withCredentials: true })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
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
                        id: image.id, // Ensure the id is included
                        src: `data:${image.fileType};base64,${image.fileData}`,
                        fileName: image.fileName,
                        label: `Completion ${index + 1}`,
                    }));
                    setCompImages(formattedImages);
                } catch (err) {
                    console.error('Error fetching completion images:', err);
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
                        id: image.id, // Ensure the id is included
                        src: `data:${image.fileType};base64,${image.fileData}`,
                        fileName: image.fileName,
                        label: `Completion ${index + 1}`,
                    }));

                setImpImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching implementation images:', error);
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

    // Handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleImageClickres = (resource) => {
        setSelectedresImage(`data:${resource.fileType};base64,${resource.fileData}`);
        setSelectedPdf(null); // Clear selected PDF
    };

    const handleImageClickout = (image) => {
        setSelectedoutImage(image);
        setSelectedPdf(null); // Clear selected PDF
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/out/Outview/${id}`, { withCredentials: true })
            .then((response) => {
                setOutimage(response.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, [id]);

    // Handle PDF click
    const handlePdfClick = (pdf) => {
        const pdfUrl = `data:${pdf.fileType};base64,${pdf.fileData}`;
        setSelectedPdf({
            url: pdfUrl,
            fileName: pdf.fileName
        });
        setSelectedImage(null);
    };

    const checklistImages = data?.checklistImages || [];
    const crosscheckImages = data?.crosscheckImages || [];

    const images = [
        ...checklistImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Checklist', id: image.id })),
    ];
    const images1 = [
        ...crosscheckImages.map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Logbook', id: image.id }))
    ];

    const { quotationImages = [], estimateImages = [] } = estImages;

    const imageArray = [
        ...quotationImages.map((image) => ({
            src: `data:${image.fileType};base64,${image.fileData}`,
            label: 'Quotation',
        })),
    ];
    const imageEstArray = [
        ...estimateImages.map((image) => ({
            src: `data:${image.fileType};base64,${image.fileData}`,
            label: 'Estimation',
        })),
    ];

    const { image1 } = outimage || {};

    const imageArray1 = (image1 || []).map((image, index) => ({
        id: image.id, // Include the ID here
        src: `data:${image.fileType};base64,${image.fileData}`,
        label: `OutSource ${index + 1}`,
    }));

    return (
        <div className='sticky-top min-vh-100 mb-5 overflow-auto sticky-top'>
            <div className=''>
                <h4 className='d-flex m-3 justify-content-center'>Views</h4>
                <div className='mt-4'>
                    <h5>Registration</h5>
                    <div className="d-flex flex-wrap ">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="thumbnail"
                                style={{
                                    cursor: 'pointer',
                                    width: '70px',
                                    height: '70px',
                                    overflow: 'hidden',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px'
                                }}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.label}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-wrap">
                        {images1.map((image, index) => (
                            <div
                                key={index}
                                className="thumbnail"
                                style={{
                                    cursor: 'pointer',
                                    width: '70px',
                                    height: '70px',
                                    overflow: 'hidden',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px'
                                }}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.label}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-3">
                    <h5>Estimation</h5>
                    <h6>vechilce condition</h6>
                    <div className="d-flex flex-wrap">
                        {imageEstArray.map((image, index) => (
                            <div key={index} className="image-preview">
                                <button
                                    key={index}
                                    className="thumbnail"
                                    style={{
                                        cursor: 'pointer',
                                        width: '70px',
                                        height: '70px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                    <h6>quotationImg</h6>
                    <div className="d-flex flex-wrap">
                        {imageArray.map((image, index) => (
                            <div key={index} className="image-preview">
                                <button
                                    key={index}
                                    className="thumbnail"
                                    style={{
                                        cursor: 'pointer',
                                        width: '70px',
                                        height: '70px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-3'>
                    <h5>Implement</h5>
                    <div className="d-flex flex-wrap">
                        {(impImages || []).map((image, index) => (
                            <div key={index} className="image-preview">
                                <button
                                    className="thumbnail"
                                    style={{
                                        cursor: 'pointer',
                                        width: '70px',
                                        height: '70px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-3'>
                    <h5>Out Source</h5>
                    <div className="d-flex flex-wrap">
                        {imageArray1.map((image, index) => (
                            <div key={index}>
                                <button
                                    className="thumbnail"
                                    style={{
                                        cursor: 'pointer',
                                        width: '70px',
                                        height: '70px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => handleImageClickout(image.src)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-3'>
                    <h5>Completion</h5>
                    <div className="d-flex flex-wrap">
                        {compImages.map((image, index) => (
                            <div key={index} className="image-preview">
                                <button
                                    className="thumbnail"
                                    style={{
                                        cursor: 'pointer',
                                        width: '70px',
                                        height: '70px',
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-3 mb-5'>
                    <h5>Attachments</h5>
                    <div className="d-flex flex-wrap">
                        {resources.map((resource) => (
                            <div key={resource.id} className="resourceItem">
                                {resource.fileType.startsWith('image/') ? (
                                    <div className="thumbnail"
                                        style={{
                                            cursor: 'pointer',
                                            width: '70px',
                                            height: '70px',
                                            overflow: 'hidden',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px'
                                        }}
                                        onClick={() => handleImageClickres(resource)}>
                                        <img
                                            src={`data:${resource.fileType};base64,${resource.fileData}`}
                                            alt={resource.fileName}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                ) : resource.fileType === 'application/pdf' ? (
                                    <div
                                        className="thumbnail"
                                        onClick={() => handleImageClickres(resource)}
                                    >
                                        <img
                                            src={img} // Replace this with the actual path to your PDF logo
                                            alt={resource.fileName}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                ) : (
                                    <p>Unsupported file type</p>
                                )}
                            </div>
                        ))}
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
                {selectedoutImage && (
                    <div className="image-modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => setSelectedoutImage(null)}>
                                &times;
                            </button>
                            <img
                                src={selectedoutImage}
                                alt="Preview"
                                style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
                            />
                        </div>
                    </div>
                )}
                {selectedresImage && (
                    <div className="image-modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => { setSelectedresImage(null); setSelectedImage(null); }}>
                                &times;
                            </button>
                            <img
                                src={selectedresImage}
                                alt="Preview"
                                style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashright;