import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";
import styles from './ClientsPage.module.css';

const ClientsPage = () => {

  



  return(
    <div className={styles.ClientsPage}>
        
  
        <div class="invoices-main-content-2">
        <div class="main-content-header">
          <div class="header-Name">
            Клиенти
          </div>
          <div class="header-Number">
             (721)
          </div>
  
           <Link to={`/add-clients`}> <div class="button-Add-2" >
                  <i class="icon-add"></i>
                    Добавяне на Клиент
                  </div></Link>
  
        
          <div class="search-holder">
            <i class="icon-search"></i>
            <input type="text" placeholder="Търсене" name="defaultInput" id="defaultInput"  />
          </div>
  
         
        </div>
  
        <div class="invoices-table">
                  <table>
                      <thead>
                          <tr>
                              <th>Клиент</th>
                              <th>МОЛ</th>
                              <th>Тип</th>
                              <th>ЕИК/ЕГН</th>
                              <th>Действие</th>
                          </tr>
                      </thead>
                      <tbody>
  
                              
                              <tr>

                                <td>"Кристал Лес - 02" ЕООД</td>
                                <td> Исмет Трампов</td>
                                <td> Фирма </td>
                               
                                <td>
                                    22020202020
                                
                                </td>
  
                                <td>
                                  <i class="icon-pen"></i>
                                  <i class="icon-trash"></i>
                                </td>
                              </tr>
                           
                      </tbody>
                  </table>
              </div>  
  
      </div>
  
    </div>
    );

  };

ClientsPage.propTypes = {};

ClientsPage.defaultProps = {};

export default ClientsPage;
