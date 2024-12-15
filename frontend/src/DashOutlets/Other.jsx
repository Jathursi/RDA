import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Other() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState(1);
  const [isInitialSubmission, setIsInitialSubmission] = useState(true);

  const [otherDetails, setOtherDetails] = useState([{ other: '', other_cost: '', otherQ: '', other_date: '', other_Sup: '', other_Auth: '' }]);
  const [stockDetails, setStockDetails] = useState([{ Stock: '', Stock_cost: '', StockQ: '', Stock_date: '', Stock_Sup: '', Stock_Auth: '' }]);
  const [macDetails, setMacDetails] = useState([{ Machining: '', Mac_cost: '', MacQ: '', Mac_date: '', Mac_Sup: '', Mac_Auth: '' }]);
  const [welDetails, setWelDetails] = useState([{ Welding: '', Wel_cost: '', WelQ: '', Wel_date: '', Wel_Sup: '', Wel_Auth: '' }]);
  const [transDetails, setTransDetails] = useState([{ Transport: '', Trans_cost: '', TransQ: '', Trans_date: '', Trans_Sup: '', Trans_Auth: '' }]);
  const [sunDetails, setSunDetails] = useState([{ Sundries: '', Sun_cost: '', SunQ: '', Sun_date: '', Sun_Sup: '', Sun_Auth: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filterEmptyFields = (detailsArray) => {
      return detailsArray.filter(item => Object.values(item).some(value => value !== ''));
    };

    const payload = {
      book_id: id,
      otherDetails: filterEmptyFields(otherDetails),
      stockDetails: filterEmptyFields(stockDetails),
      macDetails: filterEmptyFields(macDetails),
      welDetails: filterEmptyFields(welDetails),
      transDetails: filterEmptyFields(transDetails),
      sunDetails: filterEmptyFields(sunDetails),
    };

    const url = isInitialSubmission
      ? `http://localhost:8081/api/other/Otherinsert/${id}`
      : `http://localhost:8081/api/other/Otherupdate/${id}`;

    const method = isInitialSubmission ? 'post' : 'put';

    try {
      await axios({ method, url, data: payload });
      console.log(isInitialSubmission ? "Data added successfully" : "Data updated successfully");
      setIsInitialSubmission(false);
      navigate('/Home');
    } catch (err) {
      console.error('Error adding/updating data:', err);
    }
  };

  const createDetailsHandler = (detailsState, setDetailsState, defaultValues) => ({
    handleChange: (e, index) => {
      const { name, value } = e.target;
      const newDetails = [...detailsState];
      newDetails[index][name] = value;
      setDetailsState(newDetails);
    },
    handleAddMore: () => {
      setDetailsState([...detailsState, defaultValues]);
      setVisibleSections(visibleSections + 1);
    },
  });

  const otherHandler = createDetailsHandler(otherDetails, setOtherDetails, { other: '', other_cost: '', otherQ: '', other_date: '', other_Sup: '', other_Auth: '' });
  const stockHandler = createDetailsHandler(stockDetails, setStockDetails, { Stock: '', Stock_cost: '', StockQ: '', Stock_date: '', Stock_Sup: '', Stock_Auth: '' });
  const macHandler = createDetailsHandler(macDetails, setMacDetails, { Machining: '', Mac_cost: '', MacQ: '', Mac_date: '', Mac_Sup: '', Mac_Auth: '' });
  const welHandler = createDetailsHandler(welDetails, setWelDetails, { Welding: '', Wel_cost: '', WelQ: '', Wel_date: '', Wel_Sup: '', Wel_Auth: '' });
  const transHandler = createDetailsHandler(transDetails, setTransDetails, { Transport: '', Trans_cost: '', TransQ: '', Trans_date: '', Trans_Sup: '', Trans_Auth: '' });
  const sunHandler = createDetailsHandler(sunDetails, setSunDetails, { Sundries: '', Sun_cost: '', SunQ: '', Sun_date: '', Sun_Sup: '', Sun_Auth: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const otherResponse = await axios.get(`http://localhost:8081/api/other/Otherother/${id}`);
        setOtherDetails(otherResponse.data || []);

        const stockResponse = await axios.get(`http://localhost:8081/api/other/OtherStock/${id}`);
        setStockDetails(stockResponse.data || []);

        const macResponse = await axios.get(`http://localhost:8081/api/other/OtherMac/${id}`);
        setMacDetails(macResponse.data || []);

        const welResponse = await axios.get(`http://localhost:8081/api/other/OtherWel/${id}`);
        setWelDetails(welResponse.data || []);

        const transResponse = await axios.get(`http://localhost:8081/api/other/OtherTrans/${id}`);
        setTransDetails(transResponse.data || []);

        const sunResponse = await axios.get(`http://localhost:8081/api/other/OtherSun/${id}`);
        setSunDetails(sunResponse.data || []);

        setIsInitialSubmission(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className='formContainer-imp'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='formTitle'>
            Other Cost
        </div>
            <div className='form-Multi-btn'>
                <label>Machining</label>
                <button type="button" onClick={macHandler.handleAddMore}>Add Machining</button>
            </div>
            {macDetails.map((mac, index) => (
                <div key={index} className='dateGroup'>
                    <div className='formGroup'>
                        <label className='label'>Machining {index + 1}</label>
                        <input className='input' type='text' name='Machining' value={mac.Machining} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Machining Cost</label>
                        <input className='input' type='text' name='Mac_cost' value={mac.Mac_cost} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Machining Quantity</label>
                        <input className='input' type='text' name='MacQ' value={mac.MacQ} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Machining Date</label>
                        <input className='input' type='date' name='Mac_date' value={mac.Mac_date} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Machining Supplier</label>
                        <input className='input' type='text' name='Mac_Sup' value={mac.Mac_Sup} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Machining Authorizer</label>
                        <input className='input' type='text' name='Mac_Auth' value={mac.Mac_Auth} onChange={(e) => macHandler.handleChange(e, index)} />
                    </div>
                </div>
            ))}
            <div className='form-Multi-btn'>
                <label>Welding</label>
                <button type="button" onClick={welHandler.handleAddMore}>Add Welding</button>
            </div>
            {welDetails.map((wel, index) => (
                <div key={index} className='dateGroup'>
                    <div className='formGroup'>
                        <label className='label'>Welding {index + 1}</label>
                        <input className='input' type='text' name='Welding' value={wel.Welding} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Welding Cost</label>
                        <input className='input' type='text' name='Wel_cost' value={wel.Wel_cost} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Welding Quantity</label>
                        <input className='input' type='text' name='WelQ' value={wel.WelQ} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Welding Date</label>
                        <input className='input' type='date' name='Wel_date' value={wel.Wel_date} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Welding Supplier</label>
                        <input className='input' type='text' name='Wel_Sup' value={wel.Wel_Sup} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Welding Authorizer</label>
                        <input className='input' type='text' name='Wel_Auth' value={wel.Wel_Auth} onChange={(e) => welHandler.handleChange(e, index)} />
                    </div>
                </div>
            ))}
            <div className='form-Multi-btn'>
                <label>Transport</label>
                <button type="button" onClick={transHandler.handleAddMore}>Add Transport</button>
            </div>
            {transDetails.map((trans, index) => (
                <div key={index} className='dateGroup'>
                    <div className='formGroup'>
                        <label className='label'>Transport {index + 1}</label>
                        <input className='input' type="text" name="Transport" value={trans.Transport} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Transport Cost</label>
                        <input className='input' type="text" name="Trans_cost" value={trans.Trans_cost} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Transport Quantity</label>
                        <input className='input' type="text" name="TransQ" value={trans.TransQ} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Transport Date</label>
                        <input className='input' type="date" name="Trans_date" value={trans.Trans_date} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Transport Supplier</label>
                        <input className='input' type="text" name="Trans_Sup" value={trans.Trans_Sup} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Transport Authorizer</label>
                        <input className='input' type="text" name="Trans_Auth" value={trans.Trans_Auth} onChange={(e) => transHandler.handleChange(e, index)} />
                    </div>
                    </div>
            ))}
            <div className='form-Multi-btn'>
                <label>Sundries</label>
                <button type="button" onClick={sunHandler.handleAddMore}>Add Sundries</button>
            </div>
            {sunDetails.map((sun, index) => (
                <div key={index} className='dateGroup'>
                    <div className='formGroup'>
                        <label className='label'>Sundries {index + 1}</label>
                        <input className='input' type="text" name="Sundries" value={sun.Sundries} onChange={(e) => sunHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Sundries Cost</label>
                        <input className='input' type="text" name="Sun_cost" value={sun.Sun_cost} onChange={(e) => sunHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Sundries Quantity</label>
                        <input className='input' type="text" name="SunQ" value={sun.SunQ} onChange={(e) => sunHandler.handleChange(e, index)} />
                    </div>
                    <div className='formGroup'>
                        <label className='label'>Sundries Date</label>
                        <input className='input' type="date" name="Sun_date" value={sun.Sun_date} onChange={(e) => sunHandler.handleChange(e, index)} />
                    </div>
                </div>
            ))}
            <div className='form-Imp-btn'>
                <button className='submitButton' type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Other;