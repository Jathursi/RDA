import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OutDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialize as null for an object
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // For the clicked image

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/out/Outview/${id}`, { withCredentials: true })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError('An error occurred. Please try again.');
                console.error('Error fetching data:', err);
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>; // Display a loading message until data is fetched
    }

    const { outsourceEntries, sundriesEntries, image1 } = data;

    const imageArray = (image1 || []).map((image, index) => ({
        src: `data:${image.fileType};base64,${image.fileData}`,
        label: `OutSource ${index + 1}`,
    }));

    return (
        <div>
            <h3>Out Source: {id}</h3>
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
                            {outsourceEntries.map((entry, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>Date</td>
                                        <td>{entry.Date}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{entry.Description}</td>
                                    </tr>
                                    <tr>
                                        <td>Job_NO</td>
                                        <td>{entry.Job_NO}</td>
                                    </tr>
                                    <tr>
                                        <td>Supplier</td>
                                        <td>{entry.Supplier}</td>
                                    </tr>
                                    <tr>
                                        <td>Cost</td>
                                        <td>{entry.cost}</td>
                                    </tr>
                                    <tr>
                                        <td>Authority</td>
                                        <td>{entry.Authority}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                            {sundriesEntries.map((sundry, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>Sundries</td>
                                        <td>{sundry.Sundries}</td>
                                    </tr>
                                    <tr>
                                        <td>Cost</td>
                                        <td>{sundry.Sun_cost}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4">
                    <h5>Images</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {imageArray.map((image, index) => (
                            <button
                                key={index}
                                // className="btn btn-link text-start"
                                className='thumbnail'
                                onClick={() => setSelectedImage(image.src)}
                            >
                                {/* {image.label} */}
                                <img src={image.src} alt={image.label} style={{ width: '100%' }} />
                            </button>
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
                            src={selectedImage}
                            alt="Preview"
                            style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OutDetails;