import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { IoMdAdd } from "react-icons/io";
import CompRegist from './CompRegist';


function Completion() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false); // Track if data already exists
    const [showRegist, setShowRegist] = useState(false);
    
    const [values, setValues] = useState({
        ID: id,
        supervised: '',
        initiated: '',
        closed: '',
        close_date: '',
        approved: '',
        Voucher:'',
        aditional_fault: ''
    });
    const [images, setImages] = useState([]);
    const [options, setOptions] = useState([]);
useEffect(() => {
        axios.get('http://localhost:8081/api/drop/names', { withCredentials: true })
            .then(response => {
                const { uniqueNames } = response.data;
                const nameOptions = uniqueNames.map(name => ({ value: name, label: name }));
                setOptions(nameOptions);
            })
            .catch(error => {
                console.error('Error fetching names:', error);
            });
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/comp/comp/${id}`);
                console.log('Completion Data:', res.data);
                const { supervised, initiated, closed, close_date, approved, Voucher, aditional_fault } = res.data;
                const formattedDate = close_date.split('T')[0];
                if (res.data) {
                    setValues({
                        supervised: supervised || '',
                        initiated: initiated || '',
                        closed: closed || '',
                        close_date: formattedDate || '',
                        approved: approved || '',
                        Voucher: Voucher || '',
                        aditional_fault: aditional_fault || ''
                    });
                    setIsUpdate(true); // Set to true if data exists
                }
            } catch (err) {
                console.error('Error fetching completion data:', err);
            }
        };

        const fetchImages = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/comp/images/${id}`);
                setImages(res.data);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };

        fetchData();
        fetchImages();
    }, [id]);
const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setValues(prevState => ({
            ...prevState,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const url = `http://localhost:8081/api/comp/${isUpdate ? 'comp' : 'Cominsert'}/${id}`;
        const request = isUpdate ? axios.put : axios.post;

        const formData = new FormData();
        formData.append('supervised', values.supervised);
        formData.append('initiated', values.initiated);
        formData.append('closed', values.closed);
        formData.append('close_date', values.close_date);
        formData.append('approved', values.approved);
        formData.append('Voucher', values.Voucher);
        formData.append('aditional_fault', values.aditional_fault);
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        request(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(isUpdate ? "Completion details updated successfully" : "Completion details added successfully");
                setIsUpdate(true); // After initial post, switch to update mode
                navigate('/Home');
            })
            .catch(err => {
                console.error(`Error ${isUpdate ? 'updating' : 'adding'} completion details:`, err);
            });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(
            (file) => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/')
        );
        if (validFiles.length !== files.length) {
            alert('Some files are invalid (too large or not an image).');
        }
        setSelectedFiles(validFiles);
    };

    return (
      <div className="row">
                      <div className="col-md-12">
                        <div className="table-wrapper">
                          <div className="table-title">
                            <div className="row title-row">
                              <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
                                <h2 className="hid ml-lg-2 items-center">Completion</h2>
                              </div>
                              <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                                <button
                                    className={`btn ${isUpdate ? 'btn btn-warning' : 'btn btn-success'} flex items-center gap-3`}
                                    onClick={() => setShowRegist(true)}
                                >
                                    <IoMdAdd size={20} />
                                    {isUpdate ? 'Edit' : 'Add'}
                                </button>
                              </div>
                            </div>
                </div>
                <div className=''>
                    <table className='table table-striped table-hover'>
                        <tbody>
                            <tr>
                                <td>Supervised</td>
                                <td>{values.supervised}</td>
                            </tr>
                            <tr>
                                <td>Initiated By</td>
                                <td>{values.initiated}</td>
                            </tr>
                            <tr>
                                <td>Closed By</td>
                                <td>{values.close_date}</td>
                            </tr>
                            <tr>
                                <td>Closed Date</td>
                                <td>{values.close_date}</td>
                            </tr>
                            <tr>
                                <td>Approved By</td>
                                <td>{values.approved}</td>
                            </tr>
                            <tr>
                                <td>Voucher</td>
                                <td>{values.Voucher}</td>
                            </tr>
                            <tr>
                                <td>Additional Fault</td>
                                <td>{values.aditional_fault}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                </div>
            {showRegist && (
                <div className="modal-overlay">
                <div className="modal-container">
                    <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
                    <CompRegist onClose={() => setShowRegist(false)} />
                </div>
                </div>
            )}
        </div>
    );
}

export default Completion;