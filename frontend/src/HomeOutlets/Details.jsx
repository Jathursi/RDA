import React from 'react';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegDetails from '../HomeDetails/RegDetails';
import EstDetails from '../HomeDetails/EstDetails';
import ImpDetails from '../HomeDetails/ImpDetails';
import CompDetails from '../HomeDetails/CompDetails';
import OutDetails from '../HomeDetails/OutDetails';
import SupDetails from '../HomeDetails/SupDetails';
function Details() {
  const { id } = useParams();
  return (
    // <div className="template d-flex align-items-center w-100">
    //   <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
    //     <RegDetails values = {{id}}/>
    //     <EstDetails values = {{id}}/>       
    //     <ImpDetails values = {{id}}/>
    //     <OutDetails values = {{id}}/>
    //     <CompDetails values = {{id}}/>

    //   </div>
    // </div>
    <div className='container-fluid mx-5'>
      <ul className="nav nav-tabs mb-3" id="myTab" role="tablist" >
        <li className="nav-item" role="presentation">
          <button
              className="nav-link active"
              id="Register-tab"
              data-bs-toggle="tab"
              data-bs-target="#Register"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
          >
              Register
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
              className="nav-link"
              id="Est-tab"
              data-bs-toggle="tab"
              data-bs-target="#Est"
              type="button"
              role="tab"
              aria-controls="Est"
              aria-selected="false"
          >
              Estimation
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
              className="nav-link"
              id="Sup-tab"
              data-bs-toggle="tab"
              data-bs-target="#Sup"
              type="button"
              role="tab"
              aria-controls="Sup"
              aria-selected="false"
          >
              Suppliment
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
              className="nav-link"
              id="Imp-tab"
              data-bs-toggle="tab"
              data-bs-target="#Imp"
              type="button"
              role="tab"
              aria-controls="Imp"
              aria-selected="false"
          >
              Implimentation
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
              className="nav-link"
              id="Out-tab"
              data-bs-toggle="tab"
              data-bs-target="#Out"
              type="button"
              role="tab"
              aria-controls="Out"
              aria-selected="false"
          >
              Outsource
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
              className="nav-link"
              id="Comp-tab"
              data-bs-toggle="tab"
              data-bs-target="#Comp"
              type="button"
              role="tab"
              aria-controls="Comp"
              aria-selected="false"
          >
              Completion
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
            className="tab-pane fade show active"
            id="Register"
            role="tabpanel"
            aria-labelledby="Material-tab"
        >
            <RegDetails values = {{id}}/>
        </div>
        <div
            className="tab-pane fade"
            id="Est"
            role="tabpanel"
            aria-labelledby="Est-tab"
        >
            <EstDetails values = {{id}}/>
        </div>
        <div
            className="tab-pane fade"
            id="Sup"
            role="tabpanel"
            aria-labelledby="Sup-tab"
        >
            <SupDetails values = {{id}}/>
        </div>
        <div
            className="tab-pane fade"
            id="Imp"
            role="tabpanel"
            aria-labelledby="Imp-tab"
        >
            <ImpDetails values = {{id}}/>
        </div>
        <div
            className="tab-pane fade"
            id="Out"
            role="tabpanel"
            aria-labelledby="Out-tab"
        >
            <OutDetails values = {{id}}/>
        </div>
        <div
            className="tab-pane fade"
            id="Comp"
            role="tabpanel"
            aria-labelledby="Comp-tab"
        >
            <CompDetails values = {{id}}/>
        </div>
      </div>
    </div>
  );
}

export default Details;