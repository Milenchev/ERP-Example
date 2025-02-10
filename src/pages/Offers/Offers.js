import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Offers.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const Offers = () => {
  const [activeLink, setActiveLink] = useState(null);

  const [offers, setOffers] = useState([]);    // State to store API data
      const [loading, setLoading] = useState(true);    // Loading state
      const [error, setError] = useState(null);        // Error state
      
    
        // Fetch data from RESTful API
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:5001/offers');
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              setOffers(data.offers);  // Store fetched data in state
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);  //


        const handleDelete = async (id) => {
          if (!window.confirm('Сигурни ли сте, че искате да изтриете тази фактура?')) {
            return;
          }
          try {
            const response = await fetch(`http://localhost:5001/deleteOffers?id=${id}`, {
              method: 'DELETE',
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            // Update state to remove the deleted invoice
            setOffers(prevInvoices => prevInvoices.filter(invoice => invoice.uid !== id));
          } catch (error) {
            console.error('Error deleting invoice:', error);
          }
        };

  const handleClick = (e) => {
    const parentElement = e.target.closest('span');
    if (parentElement) {
      setActiveLink(parentElement);
      console.log(activeLink);
    }
  };

  return(
  <div className={styles.Offers}>
    
        <div className="invoices-nav">
            <div className="invoices-menu">
                <span 
                  className={activeLink && activeLink.textContent === 'ПРОДАЖБИ' ? 'clicked' : ''}
                  onClick={handleClick}
                >
                  <i className="images sales"></i> <Link to="/Documents">ПРОДАЖБИ</Link>
                </span>
    
                <span 
                  className={activeLink === '/Expenses' ? 'clicked' : ''} 
                  onClick={handleClick}
                >
                  <i className="images package"></i> <Link to="/Expenses">РАЗХОДИ</Link>
                </span>
              <span onClick={handleClick}> <i className="images repeat"></i> АВТОМАТИЧНИ ТАКСУВАНИЯ</span>
              <span> <i className="images mail"></i><Link to="/offers">ОФЕРТИ</Link></span>
              <span onClick={handleClick}> <i className="images mail"></i> ТОВАРИТЕЛНИЦИ</span>
            </div>
    
        </div>

        <div class="invoices-main-content-2">
              <div class="main-content-header">
                <div class="header-Name">
                  Оферти
                </div>
                <div class="header-Number">
                    ({offers.length})
                </div>
        
                 <Link to={`/add-offer`}> <div class="button-Add-2" >
                        <i class="icon-add"></i>
                          Добавяне на оферта
                        </div></Link>
        
              
                <div class="search-holder">
                  <i class="icon-search"></i>
                  <input type="text" placeholder="Търсене" name="defaultInput" id="defaultInput" />
                </div>
        
               
              </div>
        
              <div class="invoices-table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="8%">Дата</th>
                                    <th width="20%">Заглавие</th>
                                    <th width="20%">Клиент</th>
                                    <th width="10%">Стойност</th>
                                    <th width="10%">Тип</th>
                                    <th width="15%">Статус</th>
                                    <th width="15%">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
        
                            {offers.map((offer, index) => (
                                    <tr>
                                      <td width="8%">{offer.dateOfOffer}</td>
                                      <td width="20%">{offer.heading}</td>
                                      <td width="20%">{offer.clientName} </td>
                                      <td width="10%">{offer.price}</td>
                                      <td width="10%">
                                        {offer.typeOfOffer === 0 ? (
                                              <span >Обект</span>
                                          ) : offer.state === 1 ? (
                                            <span >Проект</span>
                                          ) : (
                                              <h1>Unknown Status</h1>
                                          )}
                                      </td>
                                     
                                      <td width="15%">
                                      {offer.state === 0 ? (
                                              <span className="badge-waiting">ЧАКА ПЛАЩАНЕ</span>
                                          ) : offer.state === 1 ? (
                                            <span className="badge-paid">ПЛАТЕНА</span>
                                          ) : offer.state === 2 ? (
                                            <span className="badge-failed">ПРОПУСНАТО ПЛАЩАНЕ</span>
                                          ) : (
                                              <h1>Unknown Status</h1>
                                          )}
                                      
                                      </td>
        
                                      <td width="15%">
                                        <i class="icon-pen"></i>
                                        <Link to={`/print-offers`}>
                                          <i class="icon-print"></i>
                                        </Link>                                     
                                        <i class="icon-bag"></i>
                                        <i class="icon-trash" onClick={() => handleDelete(offer.uid)} style={{ cursor: 'pointer', color: 'red' }} ></i>
                                      </td>
                                    </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>  
        
            </div>

        
    

  </div>
);
};

Offers.propTypes = {};

Offers.defaultProps = {};

export default Offers;
