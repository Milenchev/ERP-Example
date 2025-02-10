import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './AddOffer.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const AddOffer = () => {

  const [clientName, setClientName] = useState("");
  const [mol, setMol] = useState("");
  const [typeOfOffer, setTypeOfOffer] = useState(0);
  const [dateOfOffer, setDateOfOffer] = useState(0);
  const [heading, setHeading] = useState("");
  const [price, setPrice] = useState(0);
  const [state, setState] = useState(0);


  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/addOffers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'clientName': clientName, 'mol': mol, 'typeOfOffer': typeOfOffer, 'dateOfOffer': dateOfOffer, 'heading': heading, 'price': price, 'state': state} ), // Send your data here
      });
  
      const result = await response.json();
      console.log(result); // Handle response as needed
      window.history.go(-1);
    } catch (error) {
      console.error('Error:', error); // Handle errors
    }
  };




  const [showContentA, setShowContentA] = useState(true);

  // Function to toggle content
  const toggleContent = (isContentA) => {
    setShowContentA(isContentA);
  };
  
  return(
  <div className={styles.AddOffer}>
    
    <div className="add-fax-holder">
          <div className="add-fax-header">
            <span>Добавяне на оферта</span>
          </div>

          <div class="add-offer-menu">
            <div class="offer-info">
              <span onClick={() => toggleContent(true)}>Основна информация</span>
              <span onClick={() => toggleContent(false)}>Артикули</span>
            </div>
          </div>


          {showContentA ? (
        <div>
          <div className="input-holder">  
            <div className="row">
              <div className="col-3 input-row">
                <span>Клиент</span>
                <input style={{width: '80%'}} className="input-label" type="text" placeholder="" name="defaultInput" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
              </div>
    
              <div className="col-3 input-row">
                <span>МОЛ</span>
                <input style={{width: '80%'}} className="input-label" type="text" placeholder="" name="defaultInput"  value={mol} onChange={(e) => setMol(e.target.value)} />
              </div>
    
              <div className="col-3 input-row">
                <span>Тип на оферта</span>
                <select style={{width: '80%'}} id="type" name="type" value={typeOfOffer} onChange={(e) => setTypeOfOffer(e.target.value)}>
                    <option value="0">Проект</option>
                    <option value="1">Обект</option>
                </select>
              </div>
    
              <div className="col-2 input-row">
                <span>Дата на оферта</span>
                <input style={{width: '120%'}} className="input-label" type="text" placeholder="" name="defaultInput" value={dateOfOffer} onChange={(e) => setDateOfOffer(e.target.value)}/>
              </div>
    
              <div className="col-2 input-row">
                <span style={{marginTop: '10px'}} >Заглавие</span>
                <input className="input-label" type="text" placeholder="" name="defaultInput" value={heading} onChange={(e) => setHeading(e.target.value)} />
              </div>
             
              
            </div>
    
    
         
          </div>
        </div>
      ) : (
        <div>
          <h2>АРТ</h2>
          <p>This is the content for section B.</p>
        </div>
      )}
    

    
                    <div className="footer">
                    <div className="btn-add" onClick={handleClick} >
                      <span>Добавяне</span>
                      </div>
                      <Link to="/offers"><div className="btn-back">
                          <span>Назад</span>
                      </div></Link> 
                     
                     
                    </div>
    
        </div>

  </div>
);
};

AddOffer.propTypes = {};

AddOffer.defaultProps = {};

export default AddOffer;
