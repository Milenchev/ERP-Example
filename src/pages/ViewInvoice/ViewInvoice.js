import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ViewInvoice.module.css';
import { useSearchParams } from 'react-router-dom';


const ViewInvoice = () => {

  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state
  const [searchParams] = useSearchParams();
  const [responseProducts, setResponseProducts] = useState([]);
  const invoice_id = searchParams.get("invoice_id");
  const [invoiceInfo, setInvoiceInfo] = useState({});

  const [totalValue, setTotalValue] = useState(0);

  const paddedInvoiceId = invoice_id ? invoice_id.padStart(10, '0') : "";
  var print_once = false;
   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5001/getDashboardInvoices');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          for(var i = 0; i < data.outgoing.length; i++) {
            if(i == invoice_id) {
              setInvoiceInfo(data.outgoing[i]);
              const response_products = await fetch('http://localhost:5001/getProductbyInvoice_id?invoice_id=' + data.outgoing[i]['uid']);
              if(response_products.ok) {
                const data_products = await response_products.json();
                var total_value = 0;
                for(var di = 0; di < data_products.product.length; di++) {
                  total_value += data_products.product[di].quantity * data_products.product[di].price;
                }
                setTotalValue(total_value);
                setResponseProducts(data_products.product);
                if(!print_once) {
                  window.print();
                  window.history.go(-1);
                  print_once = true;
                }
          
              }
            }
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [invoice_id]);  // Runs once when the component mounts

  return(
  <div className={styles.ViewInvoice}>
    
    <div class="fax-header">
      <div class="fax-name">
              {invoiceInfo.type === 0 ? (
                  <span> Фактура</span>
              ) : invoiceInfo.type === 1 ? (
                  <span> Проформа фактура <span>Oригинал</span></span>
              ) : (
                  <h1>Unknown Status</h1>
              )}
      </div>
      <div class="fax-logo">
      </div>
    </div>
    <div class="fax-row-holder">
      <div class="fax-content-row">
        <div class="fax-content-header">
          <span class="fax-content-header-span">Доставчик/изпълнител</span>
        </div>
          
          <div class="row">
          <span class="row-1">Име:</span>
          <span class="row-2">Axion Solutions</span>
          </div>
              
             <div class="row">
              <span class="row-1">Държава:</span>
              <span class="row-2">България</span>
              </div> 
              
              <div class="row">
              <span class="row-1">Гр./с.:</span>
              <span class="row-2">Пловдив</span>
              </div>

                <div class="row">
                <span class="row-1">Адрес:</span>
                <span class="row-2">ж.к "Тракия" бл. 193, вх.в, ет.2, офис 4</span>
                </div>

                  <div class="row">
                    <span class="row-1">Идент №.:ДДС:</span>
                    <span class="row-2">BG57575757</span>
                    </div>

                    <div class="row">
                    <span class="row-1">ЕИК/ЕГН:</span>
                    <span class="row-2">0191919991</span>
                    </div>

                    <div class="row">
                    <span class="row-1">МОЛ:</span>
                    <span class="row-2">Тодор Тодоров</span>
                    </div>
            
    </div>


    <div class="fax-content-row">
        <div class="fax-content-header">
          <span class="fax-content-header-span">Получател/възложител</span>
        </div>
          
          <div class="row">
          <span class="row-1">Име:</span>
          <span class="row-2">{invoiceInfo.client}</span>
          </div>
              
             <div class="row">
              <span class="row-1">Държава:</span>
              <span class="row-2">България</span>
              </div> 
              
              <div class="row">
              <span class="row-1">Гр./с.:</span>
              <span class="row-2">Пловдив</span>
              </div>

                <div class="row">
                <span class="row-1">Адрес:</span>
                <span class="row-2">ул."Йордан Гавазов" № 1</span>
                </div>

                  <div class="row">
                    <span class="row-1">Идент №.:ДДС:</span>
                    <span class="row-2">BG57575757</span>
                    </div>

                    <div class="row">
                    <span class="row-1">ЕИК/ЕГН:</span>
                    <span class="row-2">0191919991</span>
                    </div>

                    <div class="row">
                    <span class="row-1">МОЛ:</span>
                    <span class="row-2">Тодор Тодоров</span>
                    </div>
            
      </div>
    </div>

    <div class="fax-row-holder">        
      <div class="fax-content-row">
        <div class="fax-content-header">
          <span class="fax-content-header-span">Информация за фактурата</span>
        </div>
          
          <div class="row">
          <span class="row-1">Фактура №:</span>
          <span class="row-2">{paddedInvoiceId}</span>
          </div>
              
             <div class="row">
              <span class="row-1">Дата на фактурата:</span>
              <span class="row-2">{invoiceInfo.date}</span>
              </div> 
              
              <div class="row">
              <span class="row-1">Срок за плащане:</span>
              <span class="row-2">08.02.2025</span>
              </div>
            
    </div>

    <div class="fax-content-row">
        <div class="fax-content-header">
          <span class="fax-content-header-span">Информация за фактурата</span>
        </div>
          
          <div class="row">
          <span class="row-1">Валута:</span>
          <span class="row-2">BGN</span>
          </div>
              
             <div class="row">
              <span class="row-1">Начин на плащане:</span>
              <span class="row-2">{invoiceInfo.typeOfPayment === 0 ? (
                                        <span>Банков път</span>
                                    ) : invoiceInfo.typeOfPayment === 1 ? (
                                        <span>В брой</span>
                                    ) : invoiceInfo.typeOfPayment === 2 ? (
                                        <span>Пощенски паричен</span>
                                    ) : (
                                        <h1>Unknown Status</h1>
                                    )}</span>
              </div> 
              
              <div class="row">
              <span class="row-1">Банка:</span>
              <span class="row-2">ОББ-Клон Пловдив</span>
              </div>

              <div class="row">
              <span class="row-1">BIC:</span>
              <span class="row-2">UBBSBBSS</span>
              </div>

              <div class="row">
              <span class="row-1">IBAN</span>
              <span class="row-2">BG1919292198128128</span>
              </div>
            
     </div>
    </div>  


    <table class="fax-table">
                    <thead>
                        <tr>
                            <th width="3%">#</th>
                            <th width="30%">Описание на стока/услуга</th>
                            <th width="10%">Мярка</th>
                            <th width="10%">К-во</th>
                            <th width="10%">Ед. цена</th>
                            <th width="10%">Т.О.(%)</th>
                            <th width="10%">Стойност</th>
                        </tr>
                    </thead>
                    <tbody>

                    {responseProducts.map((invoice, index) => (
                    
                         <tr>
                            
                            <td width="3%">{invoice.uid}</td>
                            <td class="bold" width="20%">{invoice.name}</td>
                            <td>бр.</td> 
                            <td>{invoice.quantity} </td>
                           
                            <td>
                                  {invoice.price} лв.
                            </td>

                            <td>
                                  {invoice.discount}
                            </td>
                            <td>
                                 {invoice.quantity * invoice.price} лв.
                            </td>
                          </tr>
                      
                    ))}   
                           

                            <tr>
                              <td class="bold-left "colSpan="4">Словом: две хиляди и четиридесет лева</td>
                              <td class="bold-right" colSpan="2">Сума</td>
                              <td>{totalValue} лв.</td>                           
                            </tr>

                            <tr>
                              <td colSpan="4"></td>
                              <td class="bold-right" colSpan="2">Данъчна основа</td>
                              <td>{totalValue} лв.</td>                           
                            </tr> 

                            <tr>
                              <td colSpan="4"></td>
                              <td class="bold-right" colSpan="2">ДДС 20.00%</td>
                              <td>{totalValue * 0.2} лв.</td>                           
                            </tr> 

                            <tr>
                              <td colSpan="4"></td>
                              <td class="bold-right" colSpan="2">Общо с ДДС</td>
                              <td>{totalValue  + (totalValue * 0.2)} лв.</td>                           
                            </tr> 
                          
                    </tbody>
                   
                </table>

           <footer>
              <div class="reciever">
                <span>Получател: {invoiceInfo.client}</span>
              </div>
              <div class="owner">
                <span>Съставил: Тодор Тодоров</span>
              </div>
              <div class="shifer">
                <span>Шифър: C2000</span>
              </div>
           </footer>
  </div>);
};

ViewInvoice.propTypes = {};

ViewInvoice.defaultProps = {};

export default ViewInvoice;
