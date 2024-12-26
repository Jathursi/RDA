import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EstDetails() {
    const { id } = useParams();
    const [est, setEst] = useState(null);
    const [details, setDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // For full-page image display
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEstimate = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await axios.get(`http://localhost:8081/api/est/est/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { Date, Estimated } = response.data.estimate;
                const formattedDate = Date.split('T')[0];
                setEst({ Date: formattedDate, Estimated });
            } catch (error) {
                console.error('Error fetching estimate:', error);
                setError('Failed to fetch estimate.');
            }
        };
        fetchEstimate();
    }, [id]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/est/images/${id}`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            }
        };
        fetchImages();
    }, [id]);

    const groupDataBySupplier = (categories) => {
        const grouped = {};

        categories.forEach((item) => {
            const {
                Suppliers, MatItem, MatCost, MatQuantity,
                LabItem, LabCost, LabQuantity, MacItem,
                MacCost, MacQuantity, TransItem, TransCost,
                TransQuantity, WelItem, WelCost, WelQuantity,
                SunItem, SunCost, SunQuantity,
            } = item;

            if (!grouped[Suppliers]) {
                grouped[Suppliers] = {
                    supplierName: Suppliers,
                    items: [],
                    total: 0,
                };
            }

            const addItem = (itemName, itemCost, itemQuantity, isLabor = false) => {
                if (itemName && itemCost) {
                    const subtotal = isLabor ? itemCost : itemCost * itemQuantity;
                    grouped[Suppliers].items.push({
                        Item: itemName, Cost: itemCost, Quantity: itemQuantity, subtotal,
                    });
                    grouped[Suppliers].total += subtotal;
                }
            };

            addItem(MatItem, MatCost, MatQuantity);
            addItem(LabItem, LabCost, LabQuantity, true); // Handle labor items differently
            addItem(MacItem, MacCost, MacQuantity);
            addItem(TransItem, TransCost, TransQuantity);
            addItem(WelItem, WelCost, WelQuantity);
            addItem(SunItem, SunCost, SunQuantity);
        });

        return Object.values(grouped);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/est/fetchAllCategories/${id}`);
                const groupedData = groupDataBySupplier(response.data);
                setDetails(groupedData);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
        fetchDetails();
    }, [id]);

    const renderTable = (tableData) => (
        <table className='table '>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((supplierData, index) =>
                    supplierData.items.map((item, idx) => (
                        <tr key={`${index}-${idx}`}>
                            {idx === 0 && (
                                <td rowSpan={supplierData.items.length} style={{ textAlign: 'left' }}>
                                    {supplierData.supplierName}
                                </td>
                            )}
                            <td>{item.Item}</td>
                            <td>{item.Cost}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.subtotal}</td>
                            {idx === 0 && (
                                <td rowSpan={supplierData.items.length}>
                                    {supplierData.total}
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    if (error) return <div>{error}</div>;
    if (!est || details.length === 0) return <div>Loading...</div>;

    const { quotationImages = [], estimateImages = [] } = images;

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

    return (
        <div>
            <h3>Estimated Details</h3>
            <div className="mb-2 row gap-5">
                <div className="col-sm-7">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>{est.Date}</td>
                            </tr>
                            <tr>
                                <td>Estimated By</td>
                                <td>{est.Estimated}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4 ">
                    <h5>Images</h5>
                    <div className="d-flex flex-column gap-2">
                        {imageArray.map((image, index) => (
                            <button
                                key={index}
                                className="btn btn-link text-start"
                                onClick={() => handleImageClick(image)}
                            >
                                {image.label} {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                {details.length > 0 ? renderTable(details) : <p>No data available</p>}
            </div>

            {/* Full-Page Image Viewer */}
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
        </div>
    );
}

export default EstDetails;
