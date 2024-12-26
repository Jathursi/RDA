import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RegDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialize as null for an object
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // For the clicked image

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

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>; // Display a loading message until data is fetched
    }

    const { logbookEntry, checklistImages, crosscheckImages } = data;

    const images = [
        ...(checklistImages || []).map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Checklist' })),
        ...(crosscheckImages || []).map((image) => ({ src: `data:${image.fileType};base64,${image.base64Data}`, label: 'Logbook' }))
    ];

    return (
        <div>
            <h3>Details for Log ID: {id}</h3>
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
                                <td>Vehicle Number</td>
                                <td>{logbookEntry.Vehicle_num}</td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>{logbookEntry.Year}</td>
                            </tr>
                            <tr>
                                <td>Vehicle Type</td>
                                <td>{logbookEntry.Vehicle_type}</td>
                            </tr>
                            <tr>
                                <td>Fault</td>
                                <td>{logbookEntry.Fault}</td>
                            </tr>
                            <tr>
                                <td>Inspected</td>
                                <td>{logbookEntry.Inspected}</td>
                            </tr>
                            <tr>
                                <td>Meter</td>
                                <td>{logbookEntry.Meter}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{logbookEntry.Location}</td>
                            </tr>
                            <tr>
                                <td>Reference</td>
                                <td>{logbookEntry.Reference}</td>
                            </tr>
                            <tr>
                                <td>Response</td>
                                <td>{logbookEntry.Response}</td>
                            </tr>
                            <tr>
                                <td>CrossCheckby</td>
                                <td>{logbookEntry.CrossCheckby}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4 ">
                    <h5>Images</h5>
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

export default RegDetails;
