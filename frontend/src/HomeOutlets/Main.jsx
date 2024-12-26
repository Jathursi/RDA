import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Outlethome.css';
import { Link } from 'react-router-dom';

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
    <div className='mx-2'>
      <table className="table caption-top">
        {/* <caption>Log book</caption> */}
        <thead>
          <tr>
              <th>ID</th>
              <th style={{whiteSpace: 'nowrap'}} >Vehicle No</th>
              <th style={{whiteSpace: 'nowrap'}} >Vehicle Type</th>
              <th style={{whiteSpace: 'nowrap'}} >Vehicle Allocation</th>
              <th style={{whiteSpace: 'nowrap'}} >Reference No</th>
              <th style={{whiteSpace: 'nowrap'}} >TR/checklist</th>
              <th>Date</th>
              <th>Time</th>
              <th>Year</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody className='table-body'>
            {filteredData.map((book) => (
              <tr key={book.id}>
                <td >{book.id}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Vehicle_num}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Vehicle_type}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Location}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Reference}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Response}</td>
                <td style={{whiteSpace: 'nowrap'}} >{new Date(book.createdAt).toLocaleDateString()}</td>
                <td style={{whiteSpace: 'nowrap'}} >{new Date(book.createdAt).toLocaleTimeString()}</td>
                <td style={{whiteSpace: 'nowrap'}} >{book.Year}</td>
                <td  className=' row '>
                  <div className='col-sm-4'>
                    <Link to={`/dash/${book.id}`}>
                      <button className='btn btn-primary ' type="button">Data</button>
                    </Link>
                  </div>
                  <div className='col-sm-2'>
                    <Link to={`/home/details/${book.id}`}>
                    <button className='btn btn-primary' >details</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    // <div className='main'>
    //   <div className='home-table'>
    //     <table className='table-home'>
    //       <thead className='table-head'>
    //         
    //       </thead>
          // <tbody className='table-body'>
          //   {filteredData.map((book) => (
          //     <tr key={book.id}>
          //       <td>{book.id}</td>
          //       <td>{book.Vehicle_num}</td>
          //       <td>{book.Vehicle_type}</td>
          //       <td className='hid'>{book.Location}</td>
          //       <td className='hid'>{book.Reference}</td>
          //       <td className='hid'>{book.Response}</td>
          //       <td className='hid'>{new Date(book.createdAt).toLocaleDateString()}</td>
          //       <td className='hid'>{new Date(book.createdAt).toLocaleTimeString()}</td>
          //       <td className='hid'>{book.Year}</td>
          //       <td className='sucbtn'>
          //         {/* <button className='table-btn-data' onClick={() => navigate(`/dash/${book.id}`)}>data</button> */}
          //         <Link to={`/dash/${book.id}`}>
          //           <button className='btn-suc' type="button">Data</button>
          //         </Link>
          //         <button className='table-btn-details' onClick={() => navigate('details')}>details</button>
          //       </td>
          //     </tr>
          //   ))}
          // </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}

export default Main;