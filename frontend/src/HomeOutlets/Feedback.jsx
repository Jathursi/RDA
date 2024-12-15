import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8081/api/feedback/feedbacks', { withCredentials: true })
            .then(response => {
                const feedbackData = response.data;
                setFeedbacks(feedbackData);

                // Calculate average rating
                if (feedbackData.length > 0) {
                    const totalRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
                    setAverageRating((totalRating / feedbackData.length).toFixed(1)); // rounded to 1 decimal place
                }
            })
            .catch(error => {
                console.error('Error fetching feedback:', error);
            });
    }, []);

    return (
        <div className='formContainer-feed'>
            <div className='overall-feed'>
                <div className='feedTitles'>
                    Feedbacks
                    {feedbacks.length > 0 && (
                        <span className='averageRating'> (Overall Rating: {averageRating} ★)</span>
                    )}
                </div>
            </div>
            {feedbacks.length === 0 ? (
                <div className='noFeedback'>No feedback found</div>
            ) : (
                feedbacks.map(feedback => (
                    <div key={feedback.id} className='feedbackCard'>
                        <div className='getrate'>
                            <div className='rateName'>
                                <div className='feedbackName'>Name: {feedback.name}</div>
                            </div>
                            <div className='rateName'>
                                <div className='ratingStars'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= feedback.rating ? 'selected' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='feedbackEmail'>Email: {feedback.email}</div>
                        <div className='feedbackVehicleNum'>Vehicle Number: {feedback.vehicle_num}</div>
                        <div className='feedbackMessage'>Message: {feedback.message}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Feedback;
