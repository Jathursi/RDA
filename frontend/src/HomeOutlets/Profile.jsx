import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastOnline = async () => {
      try {
        // const token = localStorage.getItem('token'); // Retrieve the token from local storage
        // if (!token) {
        //   setError("Token is missing. Please log in again.");
        //   return;
        // }
        const response = await axios.get('http://localhost:8081/api/users/last-online', { withCredentials: true }
        );
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching last online status:", err);
        setError("Failed to load last online status.");
      }
    };

    fetchLastOnline(); // Call the function when the component loads
  }, []);

  return (
    <div className="container-fluid d-flex flex-column">
      <div className="overall-feed text-center my-4">
        <h2 className="feedTitles">Last Online Status</h2>
      </div>
      <div className="d-flex flex-column align-items-center gap-3" style={{ width: '100%' }}>
        {error ? (
          <div className="text-danger">{error}</div>
        ) : users.length === 0 ? (
          <div className="noFeedback">No users found</div>
        ) : (
          users.map(user => (
            <div 
              key={user.id} 
              className="userCard p-4 bg-light shadow-sm rounded"
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                border: '1px solid #ddd',
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="userName">
                  <strong>Name:</strong> {user.first_Name}
                </div>
                <div className="userRole">
                  <strong>Role:</strong> {user.role}
                </div>
              </div>
              <div className="userStatus">
                <strong>Status:</strong> {user.status}
              </div>
              {user.timeSinceLastOnline && (
                <div className="userLastOnline">
                  <strong>Last Online:</strong> {user.timeSinceLastOnline}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;