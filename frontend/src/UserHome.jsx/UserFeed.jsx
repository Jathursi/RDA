import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './User.css'

function UserFeed() {
  // const [vehicleNumber, setVehicleNumber] = useState('');
  const [userID, setUserID] = useState();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // vehicle_num: '',
    message: '',
    rating: 0, // Initialize rating as 0
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };
 useEffect(() => {
    axios.get('http://localhost:8081/api/users/me', { withCredentials: true })
      .then((response) => {
        // setUserID(response.data.id);
        setUserID(response.data.id);
      })
      .catch((err) => {
        // setError('An error occurred. Please try again.');
        console.error('Error fetching data:', err);
      });
  }, []); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.name === '' || formData.email === '') {
        setResponseMessage('Name and Email are required.');
        return;
      }
      const response = await axios.post(`http://localhost:8081/api/users/feedbacks/${userID}`, formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '', rating: 0 }); // reset form
    } catch (error) {
      setResponseMessage('Error submitting feedback.');
    }
  };

  return (
    <div className='feedCont'>
      <div className='feedTitle'>Feedback</div>
      {/* {responseMessage && <div className='feedResponse'>{responseMessage}</div>} */}
      <div className='feedForm'>
        <form onSubmit={handleSubmit}>
          <div className='feedFormRow'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required/>
          </div>
          <div className='feedFormRow'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required/>
          </div>
          <div className='feedFormRow'>
            <label htmlFor='message'>Message</label>
            <textarea id='message' name='message' rows={5} value={formData.message} onChange={handleChange} />
          </div>
          <div className='feedFormRow'>
            <label>Rating</label>
            <div className='ratingStars'>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= formData.rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className='feedFormRow'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFeed;
