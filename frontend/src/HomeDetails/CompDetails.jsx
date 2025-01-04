import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CompDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null); // For completion details
    const [images, setImages] = useState([]); // For images
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // For fullscreen modal view

    useEffect(() => {
        // Fetch completion details
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/comp/comp/${id}`);
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
    }, [id]);

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
                    setImages(formattedImages);
                } catch (err) {
                    console.error('Error fetching images:', err);
                    setError('Error fetching images');
                }
            };

            fetchImages();
        }
    }, [data]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>; // Display a loading message until data is fetched
    }

    return (
        <div>
            <h3>Completion Details</h3>
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
                                <td>Supervised</td>
                                <td>{data.supervised}</td>
                            </tr>
                            <tr>
                                <td>Initiated</td>
                                <td>{data.initiated}</td>
                            </tr>
                            <tr>
                                <td>Voucher</td>
                                <td>{data.Voucher}</td>
                            </tr>
                            <tr>
                                <td>Closed</td>
                                <td>{data.closed}</td>
                            </tr>
                            <tr>
                                <td>Close Date</td>
                                <td>{data.close_date}</td>
                            </tr>
                            <tr>
                                <td>Approved</td>
                                <td>{data.approved}</td>
                            </tr>
                            <tr>
                                <td>Aditional Fault</td>
                                <td>{data.aditional_fault}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Display Thumbnails */}
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
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
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
    );
}

export default CompDetails;
