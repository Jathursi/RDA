import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Topuser from './Topuser';
import { Outlet } from 'react-router-dom';

function UserHome() {

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve the token from local storage
//         if (!token) {
//           setError("Token is missing. Please log in again.");
//           return;
//         }
//         const response = await axios.get('http://localhost:8081/api/users/me', {
//           headers: {
//             'Authorization': `Bearer ${token}` // Add the Authorization header correctly
//           }
//         });
//         setUser(response.data);
//         console.log(response.data)
//       } catch (err) {
//         console.error("Error fetching user details:", err);
//         setError("Failed to load user details.");
//       }
//     };

//     fetchUser(); // Call the function when the component loads
//   }, []);

  return (
    <div className='User-home vh-100 w-100 bg-light'>
        <div></div>
      <Topuser />
      <div className='d-flex justify-content-center'>
        <Outlet />
      </div>
    </div>
  );
}

export default UserHome;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../App.css';
// import { Outlet } from 'react-router-dom';

// function UserHome() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve the token from local storage
//         if (!token) {
//           setError("Token is missing. Please log in again.");
//           return;
//         }
//         const response = await axios.get('http://localhost:8081/api/users/me', {
//           headers: {
//             'Authorization': `Bearer ${token}` // Add the Authorization header correctly
//           }
//         });
//         setUser(response.data);
//       } catch (err) {
//         console.error("Error fetching user details:", err);
//         setError("Failed to load user details.");
//       }
//     };

//     fetchUser(); // Call the function when the component loads
//   }, []);

//   return (
//     <div className='User-home vh-100 w-100 bg-light'>
//       <div className='d-flex justify-content-center'>
//         {error ? (
//           <p className="text-danger">{error}</p>
//         ) : user ? (
//           <div>
//             <h2>Welcome, {user.first_Name}</h2>
//             <p>User ID: {user.id}</p>
//             <p>Role: {user.role}</p>
//             <p>Vehicle Number: {user.vehicleNumber}</p>
//           </div>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//       <div className='d-flex justify-content-center'>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default UserHome;
