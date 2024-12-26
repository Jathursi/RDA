import React from 'react';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegDetails from '../HomeDetails/RegDetails';
import EstDetails from '../HomeDetails/EstDetails';
import ImpDetails from '../HomeDetails/ImpDetails';
import CompDetails from '../HomeDetails/CompDetails';
function Details() {
  const { id } = useParams();
  return (
    <div className="template d-flex align-items-center w-100">
      <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
        <RegDetails values = {{id}}/>
        <EstDetails values = {{id}}/>       
        <ImpDetails values = {{id}}/>
        <CompDetails values = {{id}}/>
      </div>
    </div>
  );
}

export default Details;