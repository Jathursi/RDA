import React from 'react'
import './Outlethome.css'
import { useNavigate } from 'react-router-dom'
function Main() {
  const navigate = useNavigate()
  return (
    <div className='main'>
        {/* table */}
        <div className='home-table'>
          <table className='table-home'>
            <thead className='table-head'>
              <tr>
                <th className='table-th'>Home</th>
                <th className='table-th'>Home</th>
                <th className='table-th'>Home</th>
                <th className='table-th'>Action</th>
              </tr>
            </thead>
            <tbody className='table-body'>
              <tr>
                <td className='table-td'>
                  head
                </td>
                <td className='table-td'>
                  head
                </td>
                <td className='table-td'>
                  head
                </td>
                <td className='table-btn'>
                  <button className='table-btn-data' onClick={() => navigate('/dash')}>data</button>
                  <button className='table-btn-details' onClick={() => navigate('details')}>details</button>
                </td>
              </tr>
            </tbody>
            
          </table>
        </div>
    </div>
  )
}

export default Main