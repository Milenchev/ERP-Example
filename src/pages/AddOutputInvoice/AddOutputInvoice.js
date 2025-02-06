import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './AddOutputInvoice.module.css';

const AddOutputInvoice = () => {

 const [responseProducts, setResponseProducts] = useState([]);
 const [products, setProducts] = useState([
  {id:1, name:"", unit:"бр.", quantity:0, price:0, discount:0 }
 ]);

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
            <input className="input-label" type="text" placeholder="" name="defaultInput" />
          </div>

          <div className="col-3 input-row">
            <span>Клиент</span>
            <input className="input-label" type="text" placeholder="" name="defaultInput" />
          </div>

          <div className="col-2 input-row">
            <span>Тип на документа</span>
            <select id="fruits" name="fruits">
                <option value="apple">Фактура</option>
                <option value="mango">Mango</option>
            </select>
          </div>

          <div className="col-2 input-row">
            <span>Фактура номер</span>
            <select id="fruits" name="fruits">
                <option value="apple">1618</option>
                <option value="mango">Mango</option>
            </select>
          </div>

          <div className="col-2 input-row">
            <span>Дата на фактура</span>
            <select id="fruits" name="fruits">
                <option value="number">06.02.2025</option>
                <option value="number">Mango</option>
            </select>
          </div>
         
          
        </div>


     
      </div>

      <div className="input-holder">  
        <div className="row">
        <div className="col-3 input-row">
            <span>Срок за плащане</span>
            <select id="fruits" name="fruits">
                <option value="apple">15 дни</option>
                <option value="mango">Mango</option>
            </select>
          </div>
          
        <div className="col-3 input-row">
            <span>Начин на плащане</span>
            <select id="fruits" name="fruits">
                <option value="apple">Банков превод</option>
                <option value="mango">Mango</option>
            </select>
          </div>

          <div className="col-3 input-row">
            <span>Избор на банка</span>
            <select id="fruits" name="fruits">
                <option value="apple">ОББ-клон Пловдив - BG81UBBS782</option>
                <option value="mango">Mango</option>
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
                            
                                  <td width="3%"></td>
                                  <td width="20%" > <input type="text" id={`name-${index}`} name="name" value={invoice.name} onChange={(e) => handleInputChange(invoice.id, e, index, "name")} /> 
                                    </td>
                                  <td>  
                                  <select id="unit" name="unit">
                                        <option value="unit">{invoice.unit}</option>
                                    </select></td> 
      
                                  <td>  <select id={`unit-${index}`} name="quantity">
                                        <option value="quantity">{invoice.quantity}</option>
                                        
                                    </select></td>
                                 
                                  <td>
                                  <input type="text" id={`name-${index}`} name="price" value={invoice.price} onChange={(e) => handleInputChange(invoice.id, e, index, "price")} /> </td> 
      
                                  <td>
                                  <select id={`discount-${index}`} name="discount">
                                        <option value="apple">{invoice.discount}%</option>
                                    </select></td>  
                                  <td>
                                  0.00
                                  </td>
                                </tr>

                 
                      ))}

                            <tr>
                              <td className="bold-left "colSpan="4"></td>
                              <td className="bold-right" colSpan="2">Субтотал</td>
                              <td> 0.00</td>                           
                            </tr>

                     
                          

                            <tr>
                              <td colSpan="4"></td>
                              <td className="bold-right" colSpan="2">ДДС 20%</td>
                              <td>0.00</td>                           
                            </tr> 

                            <tr>
                              <td colSpan="4"></td>
                              <td className="bold-right" colSpan="2">Общо с ДДС</td>
                              <td> 0.00</td>                           
                            </tr> 
                          
                    </tbody>
                   
                </table>

                <div className="footer">
                <div className="btn-add">
                  <span>Добавяне</span>
                  </div>
                <div className="btn-addAndPrint">
                  <span>Добавяне и печат</span>
                  </div>
                  <div className="btn-back">
                      <span>Назад</span>
                  </div>
                 
                 
                </div>

    </div>
  </div>);
};

AddOutputInvoice.propTypes = {};

AddOutputInvoice.defaultProps = {};

export default AddOutputInvoice;
