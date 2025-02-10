import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PrintOffer.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

const PrintOffer = () => {


  return(
  <div className={styles.PrintOffer}>
   
    <div class="print-offers-header">

    </div>
    <span className="offer">ОФЕРТА</span>
      <div class="print-offers-content">
        <div class="print-offers-row">
            <div class="row">
            <span class="row-offer">Аксион Солюшънс ЕООД:</span>
            <span class="row-offer-1">ул.Георги Данчов 18</span>
            <span class="row-offer-2">Пловдив 4023, България</span>
            <span class="row-offer-3">0700 112 67</span>
            <span class="row-offer-4">office@axion.solutions</span>
            <span class="row-offer-4">www.axion.solutions</span>
            </div>
        </div>
      </div>

      <div class="print-offers-content">
        <div class="print-offers-row-2">
            <div class="row">
            <span style={{fontSize: "14px"}} class="row-offer">До</span>
            <span style={{fontSize: "14px"}}class="row-offer-1">Даикс 00Д</span>
            <span style={{fontSize: "14px"}}class="row-offer-2">Георги Георгиев</span>
            </div>
        </div>
      </div>


      <table class="fax-table">
                    <thead>
                        <tr>
                            <th width="3%">№</th>
                            <th width="30%">Описание</th>
                            <th width="10%">Мярка</th>
                            <th width="10%">К-во</th>
                            <th width="10%">Ед. цена</th>
                            <th width="10%">Общо</th>
                        </tr>
                    </thead>
                    <tbody>

                    
                         <tr>
                            
                            <td width="3%"></td>
                            <td class="bold" width="20%"></td>
                            <td></td> 
                            <td></td> 
                            <td></td> 
                            <td></td> 
                           
                          </tr>


                            <tr>
                              <td class="bold-left "colSpan="5"></td>
                              <td> лв.</td>                           
                            </tr>
                          
                    </tbody>
                   
                </table>


              <div class="autograph">
                <div class="autograph-name">
                    <span>Изготвил</span>
                </div>
                <div class="autograph-sign">

                </div>
              </div>

              <div class="sum-offers-content">
                <div class="sum-offers-row">
                    <div class="row">
                    <span style={{fontSize:"15px",backgroundColor: "black", color:"white", textAlign:"center"}}class="row-offer">1200лв.</span>
                    <span style={{fontSize:"15px", backgroundColor: "white", color:"black", textAlign:"center"}}class="row-offer-1">1400лв</span>
                    <span style={{fontSize:"15px",backgroundColor: "blue", color:"white", textAlign:"center"}}class="row-offer-2">2020лв.</span>
                    </div>
                </div>
              </div>

              <div class="sum-offers-content">
                <div class="sum-offers-row">
                    <div class="row">
                    <span style={{fontSize:"14px"}}class="row-offer">Общо</span>
                    <span style={{fontSize:"14px", marginTop: "5px"}}class="row-offer-1">ДДС 20%</span>
                    <span style={{fontSize:"14px", marginTop: "5px"}} class="row-offer-2">ВСИЧКО С ДДС</span>
                    </div>
                </div>
              </div>


              <div class="offer-footer">
                  <span style={{fontWeight:"Bold",fontSize:"14px", marginTop: "10px"}}>Забележка:</span>
                  <span style={{marginTop: "5px"}}>1. Валидност на офертата 30 дни</span>
                  <span style={{marginTop: "5px"}}>2. Доставка на оборудването до 2 седмици</span>
              </div>



  </div>
);
};

PrintOffer.propTypes = {};

PrintOffer.defaultProps = {};

export default PrintOffer;
