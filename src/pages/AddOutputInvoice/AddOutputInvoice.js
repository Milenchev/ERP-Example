import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './AddOutputInvoice.module.css';
import { Outlet, Link } from "react-router-dom";

const AddOutputInvoice = () => {
 const [clientName, setClientName] = useState("");
 const [owner, setOwner] = useState("");
 const [typeDoc, setTypeDoc] = useState("0");
 const [faxNum, setFaxNum] = useState("");
 const [faxDate, setFaxDate] = useState("");
 const [paymentType, setPaymentType] = useState("0");
 const [responseProducts, setResponseProducts] = useState([]);
 const [products, setProducts] = useState([
  {id:1, name:"", unit:"бр.", quantity:0, price:0, discount:0 }
 ]);

 const handleClick = async () => {
  try {
    var invoiceTotalValue = products.reduce((acc, invoice) => (
      acc + (invoice.quantity * invoice.price) * (1 - invoice.discount / 100) +
        (invoice.quantity * invoice.price) * (1 - invoice.discount / 100) * 0.20
    ), 0).toFixed(2);
    const response = await fetch('http://localhost:5001/addOutgoingInvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'invoice':{ 'client':clientName, 'ownerName': owner, 'type': typeDoc, 'fax': faxNum, 'date':faxDate, 'typeOfPayment':paymentType, 'total_value':invoiceTotalValue, 'products':products } }), // Send your data here
    });

    const result = await response.json();
    console.log(result); // Handle response as needed
    window.history.go(-1);
  } catch (error) {
    console.error('Error:', error); // Handle errors
  }
};

 const handleInputChange = (id, e, index, key) => {
  // Update the product details
  let updatedProducts = products.map(item =>
    item.id === id ? { ...item, [key]: e.target.value } : item
  );
  
  // Check if it's the last row and input is not empty
  if (index === products.length - 1 && e.target.value !== "") {
    updatedProducts = [
      ...updatedProducts,
      { id: products.length + 1, name: '', unit: 'бр.', quantity: 0, price: 0, discount: 0 }
    ];
  }

  setProducts(updatedProducts);
};



  return(
  <div className={styles.AddOutputInvoice}>
    <div className="add-fax-holder">
      <div className="add-fax-header">
        <span>Добавяне на изходна фактура (3000001618)</span>
      </div>

      <div className="input-holder">  
        <div className="row">
          <div className="col-3 input-row">
            <span>Клиент</span>
            <input className="input-label" type="text" placeholder="" name="defaultInput" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
          </div>

          <div className="col-3 input-row">
            <span>МОЛ</span>
            <input className="input-label" type="text" placeholder="" name="defaultInput" value={owner} onChange={(e) => setOwner(e.target.value)} />
          </div>

          <div className="col-2 input-row">
            <span>Тип на документа</span>
            <select id="type" name="type" value={typeDoc} onChange={(e) => setTypeDoc(e.target.value)}>
                <option value="0">Фактура</option>
                <option value="1">Проформа фактура</option>
            </select>
          </div>

          <div className="col-2 input-row">
            <span>Фактура номер</span>
            <input className="input-label" type="text" placeholder="" name="defaultInput" value={faxNum} onChange={(e) => setFaxNum(e.target.value)} />
          </div>

          <div className="col-2 input-row">
            <span>Дата на фактура</span>
            <input className="input-label" type="text" placeholder="" name="defaultInput" value={faxDate} onChange={(e) => setFaxDate(e.target.value)} />
          </div>
         
          
        </div>


     
      </div>

      <div className="input-holder">  
        <div className="row">
        
        <div className="col-3 input-row">
            <span>Начин на плащане</span>
            <select id="fruits" name="fruits" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                <option value="0">Банков превод</option>
                <option value="1">В брой</option>
                <option value="2">Пощенски паричен</option>
               
            </select>
          </div>
          
        </div>
     
      </div>
            <table>
                <thead>
                        <tr>
                            <th width="3%">№</th>
                            <th width="50%">Описание на стока/услуга</th>
                            <th width="10%">Мярка</th>
                            <th width="10%">К-во</th>
                            <th width="10%">Ед. цена</th>
                            <th width="10%">Т.О.(%)</th>
                            <th width="10%">Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                      {products.map((invoice, index) => (
                                  <tr key={invoice.id} >
                            
                                  <td width="3%">{invoice.id}</td>
                                  <td width="20%" > <input class="width-90" type="text" id={`name-${index}`} name="name" value={invoice.name} onChange={(e) => handleInputChange(invoice.id, e, index, "name")} /> 
                                    </td>
                                  <td>  
                                  <select id="unit" name="unit">
                                        <option value="unit">{invoice.unit}</option>
                                    </select></td> 
      
                                  <td>
                                    <input type="number" d={`quantity-${index}`} name="quantity" value={invoice.quantity} onChange={(e) => handleInputChange(invoice.id, e, index, "quantity")}></input>
                                  </td>
                                 
                                  <td>
                                  <input type="text" id={`name-${index}`} name="price" value={invoice.price} onChange={(e) => handleInputChange(invoice.id, e, index, "price")} /> </td> 
      
                                  <td>
                                  <select id={`discount-${index}`} name="discount">
                                        <option value="apple">{invoice.discount}%</option>
                                    </select></td>  
                                  <td>
                                    {(invoice.price * invoice.quantity).toFixed(2)} лв.
                                  </td>
                                </tr>

                 
                      ))}

                            <tr>
                              <td className="bold-left "colSpan="4"></td>
                              <td className="bold-right" colSpan="2">Субтотал</td>
                              <td> {products.reduce((acc, invoice) => (
                                  acc + (invoice.quantity * invoice.price) * (1 - invoice.discount / 100)
                                ), 0).toFixed(2)} лв.</td>                           
                            </tr>

                     
                          

                            <tr>
                              <td colSpan="4"></td>
                              <td className="bold-right" colSpan="2">ДДС 20%</td>
                              <td>
                              {products.reduce((acc, invoice) => (
                                    acc + (invoice.quantity * invoice.price) * (1 - invoice.discount / 100) * 0.20
                                  ), 0).toFixed(2)} лв.
                              </td>                           
                            </tr> 

                            <tr>
                              <td colSpan="4"></td>
                              <td className="bold-right" colSpan="2">Общо с ДДС</td>
                              <td> 
                              {products.reduce((acc, invoice) => (
                                    acc + (invoice.quantity * invoice.price) * (1 - invoice.discount / 100) +
                                      (invoice.quantity * invoice.price) * (1 - invoice.discount / 100) * 0.20
                                  ), 0).toFixed(2)} лв.
                              </td>                           
                            </tr> 
                          
                    </tbody>
                   
                </table>

                <div className="footer">
                <div className="btn-add" onClick={handleClick}>
                  <span>Добавяне</span>
                  </div>
                <div className="btn-addAndPrint">
                  <span>Добавяне и печат</span>
                  </div>
                  <Link to="/Documents"><div className="btn-back">
                      <span>Назад</span>
                  </div></Link> 
                 
                 
                </div>

    </div>
  </div>);
};

AddOutputInvoice.propTypes = {};

AddOutputInvoice.defaultProps = {};

export default AddOutputInvoice;
