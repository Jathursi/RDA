import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './dashout.css';

function Implement() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Start_Date: '',
        Job_Assigned: '',
        Req_date: '',
        Req_off: '',
        Auth: '',
    });
    const [suppliers, setSuppliers] = useState([
        {
            supplier: '',
            Quotation: '',
            images: [],
            materials: [{ Material: '', Mat_cost: '', MatQ: '', issued: '' }],
        },
    ]);
    const [labourDetails, setLabourDetails] = useState([{ Labour: '', Lab_cost: '', LabQ: '' }]);
    const [isInitialSubmission, setIsInitialSubmission] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSupplierChange = (index, event) => {
        const { name, value } = event.target;
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[index][name] = value;
        setSuppliers(updatedSuppliers);
    };

    const handleLabourInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLabourDetails = [...labourDetails];
        updatedLabourDetails[index][name] = value;
        setLabourDetails(updatedLabourDetails);
    };

    const handleMaterialChange = (supplierIndex, materialIndex, event) => {
        const { name, value } = event.target;
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[supplierIndex].materials[materialIndex][name] = value;
        setSuppliers(updatedSuppliers);
    };

    const handleImageChange = (supplierIndex, event) => {
        const files = Array.from(event.target.files);
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[supplierIndex].images = files;
        setSuppliers(updatedSuppliers);
    };

    const handleAddMoreSupplier = () => {
        setSuppliers([
            ...suppliers,
            {
                supplier: '',
                Quotation: '',
                images: [],
                materials: [{ Material: '', Mat_cost: '', MatQ: '', issued: '' }],
            },
        ]);
    };

    const handleAddMoreLabour = () => {
        setLabourDetails([...labourDetails, { Labour: '', Lab_cost: '', LabQ: '' }]);
    };

    const handleAddMoreMaterial = (supplierIndex) => {
        const updatedSuppliers = [...suppliers];
        if (!updatedSuppliers[supplierIndex].materials) {
            updatedSuppliers[supplierIndex].materials = [];
        }
        updatedSuppliers[supplierIndex].materials.push({
            Material: '',
            Mat_cost: '',
            MatQ: '',
            issued: '',
        });
        setSuppliers(updatedSuppliers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const filteredSuppliers = suppliers.map((supplier) => ({
            ...supplier,
            materials: supplier.materials.filter((material) =>
                Object.values(material).some((value) => value !== '')
            ),
        }));

        const token = localStorage.getItem('token');
        const url = isInitialSubmission
            ? `http://localhost:8081/api/imp/Iminsert/${id}`
            : `http://localhost:8081/api/imp/Imput/${id}`;

        const method = isInitialSubmission ? 'post' : 'put';

        const formData = new FormData();
        formData.append('Start_Date', values.Start_Date);
        formData.append('Job_Assigned', values.Job_Assigned);
        formData.append('Req_date', values.Req_date);
        formData.append('Req_off', values.Req_off);
        formData.append('Auth', values.Auth);
        formData.append('labourDetails', JSON.stringify(labourDetails));
        formData.append('suppliers', JSON.stringify(filteredSuppliers));

        suppliers.forEach((supplier, index) => {
            (supplier.images || []).forEach((image, imgIndex) => {
                formData.append(`images`, image);
            });
        });

        axios({
            method,
            url,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(
                    isInitialSubmission
                        ? 'Logbook entry submitted successfully'
                        : 'Logbook entry updated successfully'
                );
                setIsInitialSubmission(false);
                navigate('/Home');
            })
            .catch((err) => {
                console.error('Error with logbook entry:', err.message);
            });
    };

    useEffect(() => {
        const fetchImplement = async () => {
            const token = localStorage.getItem('token');
            const url = `http://localhost:8081/api/imp/Imget/${id}`;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await axios.get(url, { headers });
                const data = response.data;
                setValues({
                    Start_Date: data.Start_Date,
                    Job_Assigned: data.Job_Assigned,
                    Req_date: data.Req_date,
                    Req_off: data.Req_off,
                    Auth: data.Auth,
                });
                setSuppliers(data.Suppliers.map(supplier => ({
                    ...supplier,
                    materials: supplier.Materials || [], // Ensure materials are initialized
                    images: supplier.Images || [] // Ensure images are initialized
                })) || []); // Ensure suppliers is an array
                setLabourDetails(data.Labours || []); // Ensure labourDetails is an array
            } catch (error) {
                console.error('Error fetching implement:', error.message);
            }
        };
        fetchImplement();
    }, [id]);

    return (
        <div className="formContainer-imp">
            <form onSubmit={handleSubmit} className="implementForm">
                <div className="formTitle">Implement</div>

                {/* General Fields */}
                <div className="formGroup">
                    <label className="label">Start Date:</label>
                    <input
                        className="input"
                        type="date"
                        name="Start_Date"
                        value={values.Start_Date}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Job Assigned:</label>
                    <input
                        className="input"
                        type="text"
                        name="Job_Assigned"
                        value={values.Job_Assigned}
                        onChange={handleChange}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className='addMaterial'>
                              <button type='button' onClick={handleAddMoreLabour}>+</button>
                               Labour
                            </th>
                            <th>Labour Cost</th>
                            <th>Labour Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labourDetails.map((labour, index) => (
                            <tr key={index}>
                                <td>
                                    <input type='text' className='input' name='Labour' value={labour.Labour} onChange={e => handleLabourInputChange(index, e)} />
                                </td>
                                <td>
                                    <input type='text' className='input' name='Lab_cost' value={labour.Lab_cost} onChange={e => handleLabourInputChange(index, e)} />
                                </td>
                                <td>
                                    <input type='text' className='input' name='LabQ' value={labour.LabQ} onChange={e => handleLabourInputChange(index, e)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='supplierbtn'>
                  <h2>Materials with suppliers</h2>
                  <button
                      type="button"
                      onClick={handleAddMoreSupplier}
                      className="addSupplierButton"
                  >
                      Add More Suppliers
                  </button>
                </div>
                {suppliers.map((supplier, supplierIndex) => (
                    <div key={supplierIndex} className="supplierSection">
                        <div className="formGroup">
                            <label className="label">Supplier:</label>
                            <input
                                className="input"
                                type="text"
                                name="supplier"
                                value={supplier.supplier}
                                onChange={(e) => handleSupplierChange(supplierIndex, e)}
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Quotation:</label>
                            <input
                                className="input"
                                type="text"
                                name="Quotation"
                                value={supplier.Quotation}
                                onChange={(e) => handleSupplierChange(supplierIndex, e)}
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Quotation Images:</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleImageChange(supplierIndex, e)}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className='addMaterial'>
                                    <button
                                        type="button"
                                        onClick={() => handleAddMoreMaterial(supplierIndex)}
                                        className="addMaterialButton"
                                    >
                                        +
                                    </button>
                                    Material
                                    </th>
                                    <th>Material Cost</th>
                                    <th>Material Quantity</th>
                                    <th>No. of Materials Issued</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(supplier.materials) && supplier.materials.map((material, materialIndex) => (
                                    <tr key={materialIndex}>
                                        <td>
                                            <input
                                                type="text"
                                                className="input"
                                                name="Material"
                                                value={material.Material}
                                                onChange={(e) =>
                                                    handleMaterialChange(supplierIndex, materialIndex, e)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="input"
                                                name="Mat_cost"
                                                value={material.Mat_cost}
                                                onChange={(e) =>
                                                    handleMaterialChange(supplierIndex, materialIndex, e)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="input"
                                                name="MatQ"
                                                value={material.MatQ}
                                                onChange={(e) =>
                                                    handleMaterialChange(supplierIndex, materialIndex, e)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="input"
                                                name="issued"
                                                value={material.issued}
                                                onChange={(e) =>
                                                    handleMaterialChange(supplierIndex, materialIndex, e)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='underline'></div>
                    </div>
                ))}
                <div className="formGroup">
                    <label className="label">Required Date:</label>
                    <input
                        className="input"
                        type="date"
                        name="Req_date"
                        value={values.Req_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Required Officer:</label>
                    <input
                        className="input"
                        type="text"
                        name="Req_off"
                        value={values.Req_off}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Authorized By:</label>
                    <input
                        className="input"
                        type="text"
                        name="Auth"
                        value={values.Auth}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-Imp-btn">
                    <button className="submitButton" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Implement;