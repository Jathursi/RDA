import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Outlethome.css';
import { IoMdAdd } from "react-icons/io";
import Regist from './Regist';
import { useNavigate } from 'react-router-dom';

function Main({ searchTerm }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showRegist, setShowRegist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/logbook/logbook', { withCredentials: true })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError('An error occurred. Please try again.');
        console.error('Error fetching data:', err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
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
                <h2 className="hid ml-lg-2 items-center">Manage Vehicles</h2>
              </div>
              <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                <button
                  className="btn btn-success flex items-center gap-3"
                  onClick={() => setShowRegist(true)}
                >
                  <IoMdAdd size={20} />
                  <span className='mx-2'>Add New Vehicle</span>
                </button>
              </div>
            </div>
          </div>
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Vehicle No</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Vehicle Type</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Division</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Reference No</th>
                  <th style={{ whiteSpace: 'nowrap' }}>TR/checklist</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(employee => (
                  <tr key={employee.id}>
                    <td>
                      <span className="custom-checkbox">
                        {employee.id}
                      </span>
                    </td>
                    <td>{employee.Vehicle_num}</td>
                    <td>{employee.Vehicle_type}</td>
                    <td>{employee.Location}</td>
                    <td>{employee.Reference}</td>
                    <td>{employee.Response}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{new Date(employee.createdAt).toLocaleDateString()}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{new Date(employee.createdAt).toLocaleTimeString()}</td>
                    <td>{employee.Year}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="data btn text-white"
                        onClick={() => navigate(`/dash/${employee.id}`)}
                        style={{ backgroundColor: ' #03A9F4 ' }}
                      >
                        data
                      </button>
                      <button
                        className="data btn text-white"
                        style={{ backgroundColor: ' #03A9F4 ' }}
                        onClick={() => navigate(`details/${employee.id}`)}
                      >
                        detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Regist Component as a Modal */}
      {showRegist && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={() => setShowRegist(false)}>X</button>
            <Regist onClose={() => setShowRegist(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;