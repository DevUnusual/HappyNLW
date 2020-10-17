import React from 'react';
import {FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom';

import '../styles/pages/landing.css';

import Logo from '../images/Logo.svg';

function landing(){
  return (
    <div id="page-landing">
    <div className="content-wrapper">
      <img src={Logo} alt="happy"/>

      <main>
        <h1>leve felicidade para o mundo</h1>
        <p>Visite orfanators e mude o dia de muitas crianças.</p>
      </main>

      <div className="location">
        <strong>Piaui</strong>
        <span>teresina</span>
      </div>

      <Link to="/app" className="enter-app">
        <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
      </Link>
    </div>
    </div>
  );
}

export default landing;