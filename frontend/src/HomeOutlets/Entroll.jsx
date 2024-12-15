import React, { useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Entroll({ searchTerm }) {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

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
    <div className='main'>
      <div className='home-table'>
          <table className='table-home'>
            <thead className='table-head'>
              <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Approval</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody className='table-body'>
              {filteredData.map((book) => (
              <tr key={book.id} onClick={() => navigate(`/useredit/${book.id}`)}>
                <td>{book.id}</td>
                <td>{book.first_Name}</td>
                <td>{book.email}</td>
                <td>{book.role}</td>
                <td>{book.approval}</td>
                <td className='btn-deny'>
                  {/* Check if the role is not 'Superadmin' before showing the action buttons */}
                  {book.role !== 'Superadmin' && (
                    <>
                      {book.approval === 'Pending' || book.approval === 'Access Denied' ? (
                        <button className='success' type="button" onClick={(e) => handleApproval(e, book.id, 'Approved')}>
                          <FaCheck />
                        </button>
                      ) : null}
                      {book.approval === 'Approved' ? (
                        <button className='Deny' type="button" onClick={(e) => handleApproval(e, book.id, 'Access Denied')}>
                          <IoMdClose />
                        </button>
                      ) : null}
                    </>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
            
          </table>
        </div>
    </div>
  )
}

export default Entroll