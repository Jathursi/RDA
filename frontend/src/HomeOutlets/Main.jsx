import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Outlethome.css';
import { IoMdAdd } from "react-icons/io";

function Main({ searchTerm }) {
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
    // <div className='mx-2'>
    //   <table className="table caption-top">
    //     {/* <caption>Log book</caption> */}
    //     <thead>
    //       <tr>
              
    //       </tr>
    //     </thead>
    //     <tbody className='table-body'>
    //         {filteredData.map((book) => (
    //           <tr key={book.id}>
    //             <td >{book.id}</td>
    //             <td style={{whiteSpace: 'nowrap'}} >{book.Vehicle_num}</td>
    //             <td style={{whiteSpace: 'nowrap'}} >{book.Vehicle_type}</td>
    //             <td style={{whiteSpace: 'nowrap'}} >{book.Location}</td>
    //             <td style={{whiteSpace: 'nowrap'}} >{book.Reference}</td>
    //             <td style={{whiteSpace: 'nowrap'}} >{book.Response}</td>

    //             <td style={{whiteSpace: 'nowrap'}} >{book.Year}</td>
    //             <td  className=' row '>
    //               <div className='col-sm-4'>
    //                 <Link to={`/dash/${book.id}`}>
    //                   <button className='btn btn-primary ' type="button">Data</button>
    //                 </Link>
    //               </div>
    //               <div className='col-sm-2'>
    //                 <Link to={`/home/details/${book.id}`}>
    //                 <button className='btn btn-primary' >details</button>
    //                 </Link>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //   </table>
    // </div>
    <div className="row">
      <div className="col-md-12">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row title-row">
              <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
                <h2 className="hid ml-lg-2 items-center">Manage Vehicles</h2>
              </div>
              <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
                <button className="btn btn-success flex items-center gap-3" >
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
              <th style={{whiteSpace: 'nowrap'}} >Vehicle No</th>
              <th style={{whiteSpace: 'nowrap'}} >Vehicle Type</th>
              <th style={{whiteSpace: 'nowrap'}} >Division</th>
              <th style={{whiteSpace: 'nowrap'}} >Reference No</th>
              <th style={{whiteSpace: 'nowrap'}} >TR/checklist</th>
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
                      {/* <input
                        type="checkbox"
                        checked={selectedItems.includes(employee.id)}
                        onChange={() => handleCheckboxChange(employee.id)}
                      />
                      <label></label> */}
                      {employee.id}
                    </span>
                  </td>
                  <td>{employee.Vehicle_num}</td>
                  <td>{employee.Vehicle_type}</td>
                  <td>{employee.Location}</td>
                  <td>{employee.Reference}</td>
                  <td>{employee.Response}</td>
                  <td style={{whiteSpace: 'nowrap'}} >{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td style={{whiteSpace: 'nowrap'}} >{new Date(employee.createdAt).toLocaleTimeString()}</td>
                  <td>{employee.Year}</td>
                  <td className="d-flex gap-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800" 
                      // onClick={() => handleEditClick(employee)}
                    >
                      {/* <Edit size={18} /> */}
                      data
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        // setSelectedItems([employee.id]);
                        // setShowDeleteModal(true);
                      }}
                    >
                      {/* <Trash2 size={18} /> */}
                      detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="clearfix">
            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
            <ul className="pagination">
              <li className="page-item disabled"><a href="#">Previous</a></li>
              <li className="page-item"><a href="#" className="page-link">1</a></li>
              <li className="page-item"><a href="#" className="page-link">2</a></li>
              <li className="page-item active"><a href="#" className="page-link">3</a></li>
              <li className="page-item"><a href="#" className="page-link">4</a></li>
              <li className="page-item"><a href="#" className="page-link">5</a></li>
              <li className="page-item"><a href="#" className="page-link">Next</a></li>
            </ul>
          </div> */}
          </div>
        </div>

        {/* Add Modal */}
        {/* {showAddModal && (
          <div className="modal show fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-dialog bg-white rounded-lg w-full max-w-md">
              <div className="modal-content p-6">
                <form onSubmit={handleAddEmployee}>
                  <div className="modal-header flex justify-between items-center mb-4">
                    <h4 className="modal-title text-xl font-bold">Add Employee</h4>
                    <button type="button" className="text-gray-600 hover:text-gray-800" onClick={() => setShowAddModal(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group mb-4">
                      <label className="block mb-2">Name</label>
                      <input
                        type="text"
                        className="form-control w-full p-2 border rounded"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label className="block mb-2">Email</label>
                      <input
                        type="email"
                        className="form-control w-full p-2 border rounded"
                        name="email"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label className="block mb-2">Address</label>
                      <textarea
                        className="form-control w-full p-2 border rounded"
                        name="address"
                        value={newEmployee.address}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group mb-4">
                      <label className="block mb-2">Phone</label>
                      <input
                        type="text"
                        className="form-control w-full p-2 border rounded"
                        name="phone"
                        value={newEmployee.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer flex justify-end gap-2">
                    <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-success">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )} */}

        {/* Edit Modal */}
        {/* {showEditModal && (
          <div className="modal show fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-dialog bg-white rounded-lg w-full max-w-md">
              <div className="modal-content p-6">
                <form onSubmit={handleEditSave}>
                  <div className="modal-header flex justify-between items-center mb-4">
                    <h4 className="modal-title text-xl font-bold">Edit Employee</h4>
                    <button type="button" className="text-gray-600 hover:text-gray-800" onClick={() => setShowEditModal(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  {/* Same fo
                </form>
              </div>
            </div>
          </div>
        )} */}

        {/* Delete Modal */}
        {/* {showDeleteModal && (
          <div className="modal show fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-dialog bg-white rounded-lg w-full max-w-md">
              <div className="modal-content p-6">
                <div className="modal-header flex justify-between items-center mb-4">
                  <h4 className="modal-title text-xl font-bold">Delete Employee</h4>
                  <button type="button" className="text-gray-600 hover:text-gray-800" onClick={() => setShowDeleteModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body mb-4">
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div className="modal-footer flex justify-end gap-2">
                  <button type="button" className="btn btn-default" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Main;