import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserDet() {
  const [vehicleDetails, setVehicleDetails] = useState(null); // State to store fetched details
  const [error, setError] = useState(null); // State for handling errors
  const [userID, setUserID] = useState();
  const [vehicleID, setVehicleID] = useState();
  const [images, setImages] = useState([]);
  const [EstID, setEstID] = useState([]);
  const [ImpID, setImpID] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For full-page image display
  const [impImages, setImpImages] = useState([]);
  const [CompID, setCompID] = useState([]);
  const [compImages, setCompImages] = useState([]);
  const [logbookID, setLogbookID] = useState();
  const [data, setData] = useState(null); // For completion details

  useEffect(() => {
    axios.get('http://localhost:8081/api/users/me', { withCredentials: true })
      .then((response) => {
        setUserID(response.data.id);
        setVehicleID(response.data.vehicleNumber);
      })
      .catch((err) => {
        setError('An error occurred. Please try again.');
        console.error('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    if (vehicleID) {
      axios.get('http://localhost:8081/api/users/use', { params: { vehicleID: vehicleID } })
        .then((response) => {
          setVehicleDetails(response.data); // Set vehicle details when the data is fetched
          setEstID(response.data.EstID);
          setImpID(response.data.ImpID);
          setCompID(response.data.CompID);
          setLogbookID(response.data.logbookID);
        })
        .catch((err) => {
          setError(`Error fetching data: ${err.message}`);  // Show specific error message
          console.error('Error fetching data:', err);
        });
    }
  }, [vehicleID]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/est/images/${EstID}`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images.');
      }
    };
    if (EstID) {
      fetchImages();
    }
  }, [EstID]);

  const { quotationImages = [], estimateImages = [] } = images;

  const imageArray = [
    // ...quotationImages.map((image) => ({
    //   src: `data:${image.fileType};base64,${image.fileData}`,
    //   label: 'Quotation',
    // })),
    ...estimateImages.map((image) => ({
      src: `data:${image.fileType};base64,${image.fileData}`,
      label: 'Estimation',
    })),
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const closeImageViewer = () => {
        setSelectedImage(null);
    };
useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:8081/api/imp/images/${ImpID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status !== 200) {
                    throw new Error(`Error fetching images: ${response.statusText}`);
                }

                const fetchedImages = response.data.map((image, index) => ({
                    src: `data:${image.fileType};base64,${btoa(String.fromCharCode(...new Uint8Array(image.fileData.data)))}`,
                    label: `Implement${index + 1}`,
                }));

                setImpImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError(error.message);
            }
        };

        fetchImages();
    }, [ImpID]);
    useEffect(() => {
        // Fetch completion details
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/comp/comp/${logbookID}`);
                console.log('Completion Data:', res.data);
                const { id: CompID, supervised, initiated, closed, close_date, approved, Voucher, aditional_fault } = res.data;
                const formattedDate = close_date.split('T')[0];
                setData({ CompID, supervised, initiated, closed, close_date: formattedDate, approved, Voucher, aditional_fault });
            } catch (err) {
                console.error('Error fetching completion data:', err);
                setError('Error fetching completion data');
            }
        };

        fetchData();
    }, [logbookID]);

    useEffect(() => {
        if (data && data.CompID) {
            // Fetch images using CompID
            const fetchImages = async () => {
                try {
                    const res = await axios.get(`http://localhost:8081/api/comp/images/${data.CompID}`);
                    const formattedImages = res.data.map((image, index) => ({
                        src: `data:${image.fileType};base64,${image.fileData}`,
                        fileName: image.fileName,
                        label: `completion${index + 1}`, // Updated label to use index + 1
                    }));
                    setCompImages(formattedImages);
                } catch (err) {
                    console.error('Error fetching images:', err);
                    setError('Error fetching images');
                }
            };

            fetchImages();
        }
    }, [data]);

  return (
    <div className="userdet d-flex m-3 gap-2">
      <div className="detail bg-white rounded p-3">
        <div className="d-flex justify-content-center mt-4">
          <h3>Details of Vehicle: {vehicleID}</h3>
        </div>
        {vehicleDetails ? (
          <ul>
            <li>Vehicle Type: {vehicleDetails.vehicle_type}</li>
            <li>Vehicle Number: {vehicleDetails.vehicle_num}</li>
            <li>Manufacture: {vehicleDetails.year}</li>
            <li>Meter reading: {vehicleDetails.meter}</li>
            <li>Physical: {vehicleDetails.title}</li>
            <li>Financial: {vehicleDetails.content}</li>
          </ul>
        ) : null}
      </div>
      <div className="image-user bg-white rounded p-3">
        
        <h5>Initial</h5>
        <div className="d-flex justify-content-center mt-4">
          <div className="img-est d-flex flex-wrap gap-2">
            {imageArray.map((image, index) => (
              <div className='d-flex flex-wrap' key={index}>
                <button
                  className="thumbnail"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image.src}
                    alt={image.label}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
                <div className="image-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeImageViewer}>
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
        <h5>During repairing</h5>
        <div className="d-flex justify-content-center mt-4">
        <div className="d-flex flex-wrap gap-3">
                        {impImages.map((image, index) => (
                            <div key={index} className="image-preview" onClick={() => setSelectedImage(image)}>
                                <button
                                    className="thumbnail"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    {/* {image.label} */}
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
        </div>
        <h5>After repaired</h5>
        <div className="d-flex justify-content-center mt-4">
          <div className="d-flex flex-wrap gap-3">
                        {compImages.map((image, index) => (
                            <div key={index} className="image-preview" onClick={() => setSelectedImage(image)}>
                                <button
                                    // className="btn btn-link text-start"
                                    className="thumbnail"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    {/* {image.label} */}
                                    <img
                                        src={image.src}
                                        alt={image.label}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
        </div>
      </div>
    </div>
  );
}

export default UserDet;