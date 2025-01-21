// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { IoMdClose } from "react-icons/io";
// import { FaCheck } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';

// function Entroll({ searchTerm }) {
//   const [data, setData] = React.useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get('http://localhost:8081/api/users/sign');
//         setData(res.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleApproval = async (e, id, approvalStatus) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent navigation to home page
//     try {
//       await axios.put(`http://localhost:8081/api/users/update-approval/${id}`, { approval: approvalStatus });
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === id ? { ...item, approval: approvalStatus } : item
//         )
//       );
//     } catch (err) {
//       console.error('Error updating approval status:', err);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     Object.values(item).some(
//       (value) =>
//         value &&
//         value.toString().toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
//     )
//   );

//   return (
//     // <div >
//     //   {/* <div className='home-table'> */}
//     //       <table className='table caption-top'>
//     //         <thead>
//     //           <tr>
//     //           <th>ID</th>
//     //           <th>First Name</th>
//     //           <th>Email</th>
//     //           <th>Role</th>
//     //           <th>Vehicle no.</th>
//     //           <th>Approval</th>
//     //           <th>Actions</th>
//     //         </tr>
//     //         </thead>
//     //         <tbody >
//     //           {filteredData.map((book) => (
//     //           <tr key={book.id} onClick={() => navigate(`/useredit/${book.id}`)}>
//     //             <td>{book.id}</td>
//     //             <td>{book.first_Name}</td>
//     //             <td>{book.email}</td>
//     //             <td>{book.role}</td>
//     //             <td>{book.vehicleNumber || 'NULL'}</td>
//     //             <td>{book.approval}</td>
//     //             <td className='btn-deny'>
//     //               {/* Check if the role is not 'Superadmin' before showing the action buttons */}
//     //               {book.role !== 'Superadmin' && (
//     //                 <>
//     //                   {book.approval === 'Pending' || book.approval === 'Access Denied' ? (
//     //                     <button className='btn btn-success' type="button" onClick={(e) => handleApproval(e, book.id, 'Approved')}>
//     //                       <FaCheck />
//     //                     </button>
//     //                   ) : null}
//     //                   {book.approval === 'Approved' ? (
//     //                     <button className='btn btn-danger' type="button" onClick={(e) => handleApproval(e, book.id, 'Access Denied')}>
//     //                       <IoMdClose />
//     //                     </button>
//     //                   ) : null}
//     //                 </>
//     //               )}
//     //             </td>
//     //           </tr>
//     //         ))}
//     //         </tbody>
            
//     //       </table>
//     //     {/* </div> */}
//     // </div>
//     <div className="row">
//           <div className="col-md-12">
//             <div className="table-wrapper">
//               <div className="table-title">
//                 <div className="row title-row">
//                   <div className="col-sm-6 p-0 d-flex justify-content-lg-start ">
//                     <h2 className="ml-lg-2 items-center">Manage User</h2>
//                   </div>
//                   <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
//                   </div>
//                 </div>
//               </div>
//               <div className='table-responsive'>
//               <table className="table table-striped table-hover">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Profile</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Full Name</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Email</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Role</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Vehicle No</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Approval</th>
//                   <th style={{whiteSpace: 'nowrap'}} >Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map(employee => (
//                     <tr key={employee.id}>
//                       <td>
//                         <span className="custom-checkbox">
//                           {/* <input
//                             type="checkbox"
//                             checked={selectedItems.includes(employee.id)}
//                             onChange={() => handleCheckboxChange(employee.id)}
//                           />
//                           <label></label> */}
//                           {employee.id}
//                         </span>
//                       </td>
//                       <td>{employee.first_name}</td>
//                       <td style={{whiteSpace: 'nowrap'}}>{employee.first_Name}</td>
//                       <td style={{whiteSpace: 'nowrap'}}>{employee.email}</td>
//                       <td>{employee.role}</td>
//                       <td>{employee.vehicleNumber || 'Nil'}</td>
//                       <td>{employee.approval}</td>
//                       <td className="flex gap-2">
//                         <button 
//                           className="text-blue-600 hover:text-blue-800" 
//                           // onClick={() => handleEditClick(employee)}
//                         >
//                           {/* <Edit size={18} /> */}
//                         </button>
//                         <button 
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => {
//                             // setSelectedItems([employee.id]);
//                             // setShowDeleteModal(true);
//                           }}
//                         >
//                           {/* <Trash2 size={18} /> */}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
    

//               </div>
//             </div>
    
            
//           </div>
//         </div>
//   )
// }

// export default Entroll

import React, { useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useOutletContext } from 'react-router-dom';

function Entroll() {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/users/sign');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleApproval = async (e, id, approvalStatus) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation to home page
    try {
      await axios.put(`http://localhost:8081/api/users/update-approval/${id}`, { approval: approvalStatus });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, approval: approvalStatus } : item
        )
      );
    } catch (err) {
      console.error('Error updating approval status:', err);
    }
  };

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
                <h2 className="ml-lg-2 items-center">Manage User</h2>
              </div>
              <div className="col-sm-6 p-0 d-flex justify-content-lg-end">
              </div>
            </div>
          </div>
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th style={{whiteSpace: 'nowrap'}} >Profile</th>
                  <th style={{whiteSpace: 'nowrap'}} >Full Name</th>
                  <th style={{whiteSpace: 'nowrap'}} >Email</th>
                  <th style={{whiteSpace: 'nowrap'}} >Role</th>
                  <th style={{whiteSpace: 'nowrap'}} >Vehicle No</th>
                  <th style={{whiteSpace: 'nowrap'}} >Approval</th>
                  <th style={{whiteSpace: 'nowrap'}} >Status</th>
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
                    <td>{employee.first_name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{employee.first_Name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>{employee.vehicleNumber || 'Nil'}</td>
                    <td>{employee.approval}</td>
                    <td className="flex gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800" 
                      >
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                        }}
                      >
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entroll;