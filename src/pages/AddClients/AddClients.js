import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";
import styles from './AddClients.module.css';

const AddClients = () => (
  <div className={styles.AddClients}>
    <div class="add-clients-header">
      <span>Добавяне на клиент</span>
    </div>

    <div class="add-input-holder">
      <div class="add-input-row">
        <span class="add-input-name">Основна информация</span>
        <input className="col-1" type="text" value="Фирма"/>
        <input className="col-10" type="text" value="Име на фирма/клиент"/>
      </div>
    </div>
      
    <div class="add-input-holder">
      <div class="add-input-row">
        
        <input className="col-3" type="text" value="Mol"/>
        <input className="col-3" type="text" value="ЕИК/ЕГН"/>
        <input className="col-3" type="text" value="Идент. №ДДС"/>
      </div>
    </div>
    <div class="add-input-holder">
      <div class="add-input-row">
      <span class="add-input-name">Местоположение</span>
        <input className="col-8" type="text" value="Адрес"/>
        <input className="col-2" type="text" value="Град/Село"/>
        <input className="col-11" type="text" value="Държава"/>
      </div>
    </div>
    
    <div class="add-input-holder">
      <div class="add-input-row">
      <span class="add-input-name">Допълнителна информация</span>
        <input className="col-3" type="text" value="Е-майл"/>
        <input className="col-3" type="text" value="Е-майл"/>
        <input className="col-3" type="text" value="Е-майл"/>
       
      </div>
    </div>

    <div class="add-input-btns">
      <div class="add-input-add">
        <span>Запис</span>
      </div>
       <Link to={`/clients`}> <div class="add-input-cancel" >
            <span>Отказ</span>
              </div></Link>
      
    </div>

  </div>
);

AddClients.propTypes = {};

AddClients.defaultProps = {};

export default AddClients;
