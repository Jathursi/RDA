import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function ImpDetails() {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        Start_Date: '',
        Job_Assigned: '',
        Req_date: '',
        Req_off: '',
        Auth: '',
    });
    const [selectedImage, setSelectedImage] = useState(null); // For the clicked image
    const [implementMatData, setImplementMatData] = useState({});
    // const [isInitialSubmission, setIsInitialSubmission] = useState(true);

    useEffect(() => {
    const fetchImplementMatData = async () => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8081/api/imp/implementmat/${id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            const data = response.data;

            // Group data by supplier
            const groupedData = data.reduce((acc, item) => {
                const { supplier } = item;
                if (!acc[supplier]) {
                    acc[supplier] = [];
                }
                acc[supplier].push(item);
                return acc;
            }, {});

            setImplementMatData(groupedData);
        } catch (error) {
            console.error('Error fetching implementmat data:', error.message);
        }
    };
    fetchImplementMatData();
}, [id]);

    useEffect(() => {
        const fetchImplement = async () => {
            const token = localStorage.getItem('token');
            const url = `http://localhost:8081/api/imp/Imget/${id}`;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await axios.get(url, { headers });

                 const { Start_Date,Job_Assigned, Req_date ,Req_off,Auth} = response.data;
                
                const formattedDate = Start_Date.split('T')[0];
                const formattedDatereq = Req_date.split('T')[0];

                setValues({
                    Start_Date:formattedDate,
                    Job_Assigned,
                    Req_date: formattedDatereq,
                    Req_off,
                    Auth,
                });
                // setIsInitialSubmission(false);
            } catch (error) {
                console.error('Error fetching implement:', error.message);
            }
        };

        fetchImplement();// Fetch the implementmat data on component mount
    }, [id]);
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
                    src: `data:${image.fileType};base64,${image.fileData.data}`, // Use if already Base64
                    label: `Implement ${index + 1}`,
                }));


                setImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError(error.message);
            }
        };

        fetchImages();
    }, [id]);
  return (
    <div>
        <h3>Details for Implement ID: {id}</h3>
        <div className="mb-2 row gap-5">
            <div className="col-sm-7">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Start Date</td>
                            <td>{values.Start_Date}</td>
                        </tr>
                        <tr>
                            <td>Job Assigned</td>
                            <td>{values.Job_Assigned}</td>
                        </tr>
                        <tr>
                            <td>Required Date</td>
                            <td>{values.Req_date}</td>
                        </tr>
                        <tr>
                            <td>Required Officer</td>
                            <td>{values.Req_off}</td>
                        </tr>
                        <tr>
                            <td>Authorized</td>
                            <td>{values.Auth}</td>
                        </tr>
                    </tbody>
                </table>
            </div>   
            <div className="col-sm-4">
                    <h5>Images</h5>
                    <div className="d-flex flex-wrap gap-3">
                        {images.map((image, index) => (
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
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            {/* <div id="carouselExampleIndicators" className="carousel slide col-sm-6 bg-light" data-bs-ride="carousel" style={{ maxHeight: '400px', maxWidth: '100%' }}>
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active bg-dark" : "bg-dark"}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner" style={{ maxHeight: '400px' }}>
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img
                                src={image.src}
                                className="d-block w-100"
                                alt={`Slide ${index + 1}`}
                                style={{
                                    maxHeight: '400px',
                                    objectFit: 'contain', // Ensures the image is fully visible without stretching
                                    width: '100%', // Makes the image fit within the container width
                                }}
                            />
                            <div className="text-center mt-2">
                                <h5 className='text-dark'>{image.label}</h5>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <FaChevronLeft className="carousel-control-prev-icon text-dark" />
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <FaChevronRight className="carousel-control-next-icon text-dark" />
                </button>
            </div>          */}
            <div className='mt-4'>
                    <h3>Implement Material</h3>
                    <table className='table table-bordered mb-4'>
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Issued</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(implementMatData).map(([supplier, items], index) => (
                                items.map((item, idx) => (
                                    <tr key={`${supplier}-${idx}`}>
                                        {idx === 0 && (
                                            <td rowSpan={items.length} style={{ textAlign: 'center' }}>
                                                {supplier}
                                            </td>
                                        )}
                                        <td>{item.item}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.issued}</td>
                                        <td>{item.issued * item.cost}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
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
    </div>
  )
}

export default ImpDetails

