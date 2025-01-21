// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Feedback() {
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [averageRating, setAverageRating] = useState(0);

//     useEffect(() => {
//         axios.get('http://localhost:8081/api/users/feedbacks', { withCredentials: true })
//             .then(response => {
//                 const feedbackData = response.data;
//                 setFeedbacks(feedbackData);

//                 // Calculate average rating
//                 if (feedbackData.length > 0) {
//                     const totalRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
//                     setAverageRating((totalRating / feedbackData.length).toFixed(1)); // rounded to 1 decimal place
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching feedback:', error);
//             });
//     }, []);

//     return (
//         // <div className="container-fluid d-flex flex-column">
//         //     {/* Title Section */}
//         //     <div className="overall-feed text-center my-4">
//         //         <h2 className="feedTitles">
//         //             Feedbacks
//         //             {feedbacks.length > 0 && (
//         //                 <span className="averageRating"> (Overall Rating: {averageRating} ★)</span>
//         //             )}
//         //         </h2>
//         //     </div>

//         //     {/* Feedback Cards Section */}
//         //     <div className="d-flex flex-column align-items-center gap-3" style={{ width: '100%' }}>
//         //         {feedbacks.length === 0 ? (
//         //             <div className="noFeedback">No feedback found</div>
//         //         ) : (
//         //             Array.isArray(feedbacks) && feedbacks.map(feedback => (
//         //                 <div 
//         //                     key={feedback.id} 
//         //                     className="feedbackCard p-4 bg-light shadow-sm rounded"
//         //                     style={{
//         //                         width: '80%',
//         //                         display: 'flex',
//         //                         flexDirection: 'column',
//         //                         gap: '10px',
//         //                         border: '1px solid #ddd',
//         //                     }}
//         //                 >
//         //                     {/* <div className="getrate d-flex justify-content-between align-items-center">
//         //                         <div className="rateName">
//         //                             <strong>Name:</strong> {feedback.name}
//         //                         </div>
                                
//         //                     </div>
//         //                     <div className="feedbackEmail"><strong>Email:</strong> {feedback.email}</div>
//         //                     <div className="feedbackVehicleNum">
//         //                         <strong>Vehicle Number:</strong> {feedback.vehicle_num}
//         //                     </div>
//         //                     <div className="feedbackMessage"><strong>Message:</strong> {feedback.message}</div> */}
//         //                     <table>
//         //                         <thead>
//         //                             <tr>
                                        
//         //                             </tr>
//         //                         </thead>
//         //                         <tbody>
//         //                             <tr>
                                        
//         //                             </tr>
//         //                         </tbody>
//         //                     </table>
//         //                 </div>
//         //             ))
//         //         )}
//         //     </div>
//         // </div>
//          <div className="row">
//                   <div className="col-md-12">
//                     <div className="table-wrapper">
//                       <div className="table-title">
//                         <div className="row title-row">
//                           <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
//                             <h2 className="ml-lg-2 items-center">Feedback</h2>
//                           </div>
//                           <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
//                           </div>
//                         </div>
//                       </div>
//                       <div className='table-responsive'>
//                       <table className="table table-striped table-hover">
//                         <thead>
//                           <tr>
//                             <th>VehicleNumber</th>
//                             <th>Details</th>
//                             <th>Message</th>
//                             <th>Job_Assigned</th>
//                             <th>Rating</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                         {feedbacks.map(feedback => (
//                           <tr>
//                             <td>{feedback.vehicle_num}</td>
//                                         <td className='d-flex flex-column gap-2'>
//                                             <span>{feedback.name}</span>
//                                             <span>{feedback.email}</span>
//                                         </td>
//                                         <td>{feedback.message}</td>
//                                         <td>{feedback.job_Assigned}</td>
//                                         <td>
//                                             <div className="ratingStars">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <span
//                                             key={star}
//                                             className={`star ${star <= feedback.rating ? 'selected' : ''}`}
//                                             style={{
//                                                 color: star <= feedback.rating ? 'gold' : '#ccc',
//                                                 fontSize: '1.2rem',
//                                             }}
//                                         >
//                                             ★
//                                         </span>
//                                     ))}
//                                 </div>
//                             </td>
//                           </tr>
//                         ))}
//                         </tbody>
//                       </table>
//                       </div>
//                     </div>  
//                   </div>
//                 </div>
//     );
// }

// export default Feedback;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const { searchTerm } = useOutletContext();

    useEffect(() => {
        axios.get('http://localhost:8081/api/users/feedbacks', { withCredentials: true })
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

    const filteredFeedbacks = feedbacks.filter((feedback) =>
        Object.values(feedback).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
        )
    );

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row title-row">
                            <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
                                <h2 className="ml-lg-2 items-center">Feedback</h2>
                            </div>
                            <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>VehicleNumber</th>
                                    <th>Details</th>
                                    <th>Message</th>
                                    <th>Job_Assigned</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFeedbacks.map(feedback => (
                                    <tr key={feedback.id}>
                                        <td>{feedback.vehicle_num}</td>
                                        <td className='d-flex flex-column gap-2'>
                                            <span>{feedback.name}</span>
                                            <span>{feedback.email}</span>
                                        </td>
                                        <td>{feedback.message}</td>
                                        <td>{feedback.job_Assigned}</td>
                                        <td>
                                            <div className="ratingStars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`star ${star <= feedback.rating ? 'selected' : ''}`}
                                                        style={{
                                                            color: star <= feedback.rating ? 'gold' : '#ccc',
                                                            fontSize: '1.2rem',
                                                        }}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;