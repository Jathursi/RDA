import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Estimation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({ Date: '', Estimated: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isInitialSubmission, setIsInitialSubmission] = useState(true);

  // Dynamic details states
  const [details, setDetails] = useState({
    material: [{ Material: '', Mat_cost: '', MatQ: '' }],
    labour: [{ Labour: '', Lab_cost: '', LabQ: '' }],
    machining: [{ Machining: '', Mac_cost: '', MacQ: '' }],
    welding: [{ Welding: '', Wel_cost: '', WelQ: '' }],
    transport: [{ Transport: '', Trans_cost: '', TransQ: '' }],
    sundries: [{ Sundries: '', Sun_cost: '', SunQ: '' }], // New Sundries state
  });

  const [activeCategory, setActiveCategory] = useState(''); // Tracks which form to show

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/'));
    if (validFiles.length !== files.length) alert('Some files are invalid (too large or not an image).');
    setSelectedFiles(validFiles);
  };

  const handleDetailsChange = (category, index, e) => {
    const newDetails = [...details[category]];
    newDetails[index][e.target.name] = e.target.value;
    setDetails({ ...details, [category]: newDetails });
  };

  const handleAddDetail = (category, defaultValues) => {
    setDetails({ ...details, [category]: [...details[category], defaultValues] });
  };

  // Main form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('Date', values.Date);
  //   formData.append('Estimated', values.Estimated);
  //   selectedFiles.forEach(file => formData.append('images', file));

  //   const token = localStorage.getItem('token');
  //   const url = isInitialSubmission
  //     ? `http://localhost:8081/api/est/Estinsert/${id}`
  //     : `http://localhost:8081/api/est/Estupdate/${id}`;
  //   const method = isInitialSubmission ? 'post' : 'put';

  //   try {
  //     await axios({ method, url, data: formData, headers: { Authorization: `Bearer ${token}` } });
  //     setIsInitialSubmission(false);
  //     navigate('/Home');
  //   } catch (err) {
  //     console.error('Error with main form:', err.response ? err.response.data : err.message);
  //   }
  // };

  // Individual category submit
  const handleCategorySubmit = async (category) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:8081/api/est/Other${category.charAt(0).toUpperCase() + category.slice(1)}/${id}`, details[category], {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${category} details saved successfully.`);
    } catch (err) {
      console.error(`Error saving ${category} details:`, err.message);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8081/api/est/Estview/${id}`);
  //       if (response.data.length) {
  //         setValues(response.data[0]);
  //         setIsInitialSubmission(false);
  //       }

  //       const categories = ['material', 'labour', 'machining', 'welding', 'transport', 'sundries'];
  //       for (const category of categories) {
  //         const res = await axios.get(`http://localhost:8081/api/est/Other${category.charAt(0).toUpperCase() + category.slice(1)}/${id}`);
  //         setDetails(prev => ({ ...prev, [category]: res.data }));
  //       }
  //     } catch (err) {
  //       console.error('Error fetching data:', err.message);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  // Reusable dynamic form component
  const DynamicForm = ({ category, defaultValues, label, hideExtras }) => (
    <div>
      <div className='form-Multi-btn'>
        <h3>{label} Details</h3>
        <button type='button' onClick={() => handleAddDetail(category, defaultValues)}>Add More</button>
      </div>
      {details[category].map((item, index) => (
        <div key={index} className='dateGroup'>
          {Object.keys(item).map((key) => (
            <div className='formGroup' key={key}>
              <label className='label'>{key} {index + 1}</label>
              <input
                className='input'
                type='text'
                name={key}
                value={item[key]}
                onChange={(e) => handleDetailsChange(category, index, e)}
              />
            </div>
          ))}
        </div>
      ))}
      {!hideExtras && (
        <>
          <div>
            <h3>Supplier</h3>
            <input type='text' className='input' placeholder='supplier name'/>
          </div>
          <div>
            <h3>Quotation</h3>
            <input type='text' className='input' placeholder='no.of Quotation'/>
          </div>
          <div>
            <h3>Upload Quotation</h3>
            <input type='file' />
          </div>
        </>
      )}
      <button type='button' onClick={() => handleCategorySubmit(category)}>Submit {label} Details</button>
    </div>
  );

  return (
    <div className='formContainer-com'>
      <form className='form'>
        <div className='formTitle'>Estimation</div>
        <div className='formGroup'>
          <label className='label'>Date:</label>
          <input className='input' type='date' name='Date' value={values.Date} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label className='label'>Estimated:</label>
          <input className='input' type='text' name='Estimated' value={values.Estimated} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label className='label'>Images:</label>
          <input type='file' multiple onChange={handleFileChange} />
        </div>
        <button type='submit' className='submitBtn'>{isInitialSubmission ? 'Submit' : 'Update'}</button>
      </form>

      <div className='form'>
        <div className='form-Multi-btn'>
          <h3>Select Category</h3>
          {['material', 'labour', 'machining', 'welding', 'transport', 'sundries'].map((category) => (
            <button key={category} type='button' onClick={() => setActiveCategory(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)} Details
            </button>
          ))}
        </div>

        {activeCategory && (
          <DynamicForm
            category={activeCategory}
            defaultValues={{ [`${activeCategory.charAt(0).toUpperCase()}${activeCategory.slice(1)}`]: '', cost: '', Q: '' }}
            label={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            hideExtras={activeCategory === 'sundries'} // Hide extras for Sundries
          />
        )}
      </div>
    </div>
  );
}

export default Estimation;
