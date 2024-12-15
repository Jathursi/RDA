import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

function Suppliment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    No: '',
    Date: '',
    Estimated: ''
  });
  const [visibleSections, setVisibleSections] = useState(1);
  const [isInitialSubmission, setIsInitialSubmission] = useState(true); // Track if it's the first submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const filterEmptyFields = (detailsArray) => {
    return detailsArray.filter(item => Object.values(item).some(value => value !== ''));
  };

  const filteredOtherDetails = filterEmptyFields(otherDetails);
  const filteredStockDetails = filterEmptyFields(stockDetails);
  const filteredMatDetails = filterEmptyFields(matDetails);
  const filteredMacDetails = filterEmptyFields(macDetails);
  const filteredWelDetails = filterEmptyFields(welDetails);
  const filteredTransDetails = filterEmptyFields(transDetails);
  const filteredSunDetails = filterEmptyFields(sunDetails);
  const filteredLabDetails = filterEmptyFields(LabDetails);

  const token = localStorage.getItem('token');

  try {
    await axios({
      method: 'post',
      url: `http://localhost:8081/api/sup/Supinsert/${id}`,
      data: {
        ...values,
        otherDetails: filteredOtherDetails,
        stockDetails: filteredStockDetails,
        macDetails: filteredMacDetails,
        matDetails: filteredMatDetails,
        welDetails: filteredWelDetails,
        sunDetails: filteredSunDetails,
        LabDetails: filteredLabDetails,
        transDetails: filteredTransDetails,
        book_id: id
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(isInitialSubmission ? "Logbook entry added successfully" : "Logbook entry updated successfully");
    setIsInitialSubmission(false); // After the first submission, switch to update mode
    navigate('/Home');
  } catch (err) {
    if (err.response) {
      console.error('Error with logbook entry:', err.response.status, err.response.data);
      if (err.response.status === 400 && err.response.data.message === 'Entry already exists. Use the update route instead.') {
        setIsInitialSubmission(false); // Switch to update mode if entry already exists
      } else {
        alert(`Error: ${err.response.data.message}`);
      }
    } else {
      console.error('Error with logbook entry:', err.message);
    }
  }
};

  const createDetailsHandler = (detailsState, setDetailsState, defaultValues) => {
    const handleChange = (event, index) => {
      const { name, value } = event.target;
      const newData = [...detailsState];
      if (!newData[index]) {
        newData[index] = {};
      }
      newData[index][name] = value;
      setDetailsState(newData);
    };

    const handleAdd = () => {
      setDetailsState([...detailsState, defaultValues]);
      setVisibleSections(visibleSections + 1);
    };
    return { handleChange, handleAdd };
  };

  // Details handlers
  const [otherDetails, setOtherDetails] = useState([
    { other: '', other_cost: '', otherQ: '' }
  ]);
  const otherHandler = createDetailsHandler(otherDetails, setOtherDetails, { other: '', other_cost: '', otherQ: '' });

  const [stockDetails, setStockDetails] = useState([
    { Stock: '', Stock_cost: '', StockQ: '' }
  ]);
  const stockHandler = createDetailsHandler(stockDetails, setStockDetails, { Stock: '', Stock_cost: '', StockQ: '' });

  const [matDetails, setMatDetails] = useState([
    { Material: '', Mat_cost: '', MatQ: '' }
  ]);
  const matHandler = createDetailsHandler(matDetails, setMatDetails, { Material: '', Mat_cost: '', MatQ: '' });

  const [LabDetails, setLabDetails] = useState([
    { Labour: '', Lab_cost: '', LabQ: '' }
  ]);
  const labHandler = createDetailsHandler(LabDetails, setLabDetails, { Labour: '', Lab_cost: '', LabQ: '' });

  const [macDetails, setMacDetails] = useState([
    { Machining: '', Mac_cost: '', MacQ: '' }
  ]);
  const macHandler = createDetailsHandler(macDetails, setMacDetails, { Machining: '', Mac_cost: '', MacQ: '' });

  const [welDetails, setWelDetails] = useState([
    { Welding: '', Wel_cost: '', WelQ: '' }
  ]);
  const welHandler = createDetailsHandler(welDetails, setWelDetails, { Welding: '', Wel_cost: '', WelQ: '' });

  const [transDetails, setTransDetails] = useState([
    { Transport: '', Trans_cost: '', TransQ: '' }
  ]);
  const transHandler = createDetailsHandler(transDetails, setTransDetails, { Transport: '', Trans_cost: '', TransQ: '' });

  const [sunDetails, setSunDetails] = useState([
    { Sundries: '', Sun_cost: '', SunQ: '' }
  ]);
  const sunHandler = createDetailsHandler(sunDetails, setSunDetails, { Sundries: '', Sun_cost: '', SunQ: '' });



  return (
    <div className='formContainer-imp'>
      <form onSubmit={handleSubmit} className='form'>
      <div className='formTitle'>
        Suppliment
        {/* <Link to={`/dashes/${id}/supedit`}><FaEdit/></Link> */}
      </div>
        <div className='formGroup'>
          <label className='label'>No:</label>
          <input className='input' type='text' name='No' value={values.No} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label className='label'>Date:</label>
          <input className='input' type='date' name='Date' value={values.Date} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label className='label'>Estimated:</label>
          <input className='input' type='text' name='Estimated' value={values.Estimated} onChange={handleChange} />
        </div>
        {/* <div className='form-Multi-btn'>
          <label>Other:</label>
          <button type='button' onClick={otherHandler.handleAdd}>Add More</button>
        </div>
        {otherDetails.map((other, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Other {index + 1}</label>
              <input className='input' type='text' name='other' value={other.other} onChange={e => otherHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Other Cost</label>
              <input className='input' type='text' name='other_cost' value={other.other_cost} onChange={e => otherHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Other Quantity</label>
              <input className='input' type='text' name='otherQ' value={other.otherQ} onChange={e => otherHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Stock:</label>
          <button type='button' onClick={stockHandler.handleAdd}>Add More</button>
        </div>
        {stockDetails.map((stock, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Stock {index + 1}</label>
              <input className='input' type='text' name='Stock' value={stock.Stock} onChange={e => stockHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Stock Cost</label>
              <input className='input' type='text' name='Stock_cost' value={stock.Stock_cost} onChange={e => stockHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Stock Quantity</label>
              <input className='input' type='text' name='StockQ' value={stock.StockQ} onChange={e => stockHandler.handleChange(e, index)} />
            </div>
          </div>
        ))} */}
        <div className='form-Multi-btn'>
          <label>Material:</label>
          <button type='button' onClick={matHandler.handleAdd}>Add More</button>
        </div>
        {matDetails.map((material, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Material {index + 1}</label>
              <input className='input' type='text' name='Material' value={material.Material} onChange={e => matHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Material Cost</label>
              <input className='input' type='text' name='Mat_cost' value={material.Mat_cost} onChange={e => matHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Material Quantity</label>
              <input className='input' type='text' name='MatQ' value={material.MatQ} onChange={e => matHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Labour:</label>
          <button type='button' onClick={labHandler.handleAdd}>Add More</button>
        </div>
        {LabDetails.map((labour, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Labour {index + 1}</label>
              <input className='input' type='text' name='Labour' value={labour.Labour} onChange={e => labHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Labour Cost</label>
              <input className='input' type='text' name='Lab_cost' value={labour.Lab_cost} onChange={e => labHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Labour Quantity</label>
              <input className='input' type='text' name='LabQ' value={labour.LabQ} onChange={e => labHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Machining:</label>
          <button type='button' onClick={macHandler.handleAdd}>Add More</button>
        </div>
        {macDetails.map((machining, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Machining {index + 1}</label>
              <input className='input' type='text' name='Machining' value={machining.Machining} onChange={e => macHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Machining Cost</label>
              <input className='input' type='text' name='Mac_cost' value={machining.Mac_cost} onChange={e => macHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label '>Machining Quantity</label>
              <input className='input' type='text' name='MacQ' value={machining.MacQ} onChange={e => macHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Welding:</label>
          <button type='button' onClick={welHandler.handleAdd}>Add More</button>
        </div>
        {welDetails.map((welding, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Welding {index + 1}</label>
              <input className='input' type='text' name='Welding' value={welding.Welding} onChange={e => welHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Welding Cost</label>
              <input className='input' type='text' name='Wel_cost' value={welding.Wel_cost} onChange={e => welHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Welding Quantity</label>
              <input className='input' type='text' name='WelQ' value={welding.WelQ} onChange={e => welHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Transport:</label>
          <button type='button' onClick={transHandler.handleAdd}>Add More</button>
        </div>
        {transDetails.map((trans, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Transport {index + 1}</label>
              <input className='input' type='text' name='Transport' value={trans.Transport} onChange={e => transHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Transport Cost</label>
              <input className='input' type='text' name='Trans_cost' value={trans.Trans_cost} onChange={e => transHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Transport Quantity</label>
              <input className='input' type='text' name='TransQ' value={trans.TransQ} onChange={e => transHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Multi-btn'>
          <label>Sundries:</label>
          <button type='button' onClick={sunHandler.handleAdd}>Add More</button>
        </div>
        {sunDetails.map((sundries, index) => (
          <div key={index} className='dateGroup'>
            <div className='formGroup'>
              <label className='label'>Sundries {index + 1}</label>
              <input className='input' type='text' name='Sundries' value={sundries.Sundries} onChange={e => sunHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Sundries Cost</label>
              <input className='input' type='text' name='Sun_cost' value={sundries.Sun_cost} onChange={e => sunHandler.handleChange(e, index)} />
            </div>
            <div className='formGroup'>
              <label className='label'>Sundries Quantity</label>
              <input className='input' type='text' name='SunQ' value={sundries.SunQ} onChange={e => sunHandler.handleChange(e, index)} />
            </div>
          </div>
        ))}
        <div className='form-Imp-btn'>
          <button className='submitButton' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Suppliment;