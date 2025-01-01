import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

function Completion() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false); // Track if data already exists
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
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleUpdate}>
                    <h3>Completion</h3>
                    <div className='mb-3  mt-5 row'>
                        <label className='col-sm-2 col-form-label'>Supervised by:</label>
                        <div className='col-sm-10'>
                            <CreatableSelect
                                type='text'
                                className='form-control'
                                name='supervised'
                                value={options.find(option => option.value === values.supervised)}
                                // value={values.supervised}
                                options={options}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Initiated by:</label>
                        <div className='col-sm-10'>
                            <CreatableSelect
                                type='text'
                                className='form-control'
                                name='initiated'
                                options={options}
                                // value={values.initiated}
                                value={options.find(option => option.value === values.initiated)}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Closed by:</label>
                        <div className='col-sm-10'>
                            <CreatableSelect
                                type='text'
                                className='form-control'
                                name='closed'
                                // value={values.closed}
                                options={options}
                                value={options.find(option => option.value === values.closed)}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Closed Date:</label>
                        <div className='col-sm-10'>
                            <input
                                type='date'
                                className='form-control'
                                name='close_date'
                                value={values.close_date}
                                onChange={(e) => setValues({...values, close_date: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Approved by:</label>
                        <div className='col-sm-10'>
                            <CreatableSelect
                                type='text'
                                className='form-control'
                                name='approved'
                                options={options}
                                // value={values.approved}
                                value={options.find(option => option.value === values.approved)}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Voucher:</label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                name='Voucher'
                                value={values.Voucher}
                                onChange={(e) => setValues({ ...values, Voucher: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label className='col-sm-2 col-form-label'>Aditional Fault:</label>
                        <div className='col-sm-10'>
                            <textarea
                                type='text'
                                rows={4}
                                className='form-control'
                                name='aditional_fault'
                                value={values.aditional_fault}
                                onChange={(e) => setValues({ ...values, aditional_fault: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>
                            {isUpdate ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
                <div className="mt-4">
                    {/* <h3>Uploaded Images</h3> */}
                    <div className="row">
                        {/* {images.map((image, index) => (
                            <div key={index} className="col-sm-4 mb-3">
                                <img
                                    src={`data:${image.fileType};base64,${image.fileData}`}
                                    alt={`Completion ${index + 1}`}
                                    className="img-fluid"
                                />
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Completion;