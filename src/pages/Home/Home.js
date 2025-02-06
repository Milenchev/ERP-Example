import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';

const Home = () => {
  const [test, setTest] = useState(4500); // Correctly placed inside the functional component
  const [incomingInvoices, setIncomingInvoices] = useState([]);    // State to store API data
  const [outgoingInvoices, setOutgoingInvoices] = useState([]);    // State to store API data
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state

  // Fetch data from RESTful API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/getDashboardInvoices');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setIncomingInvoices(data.incoming); 
        setOutgoingInvoices(data.outgoing);  // Store fetched data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Runs once when the component mounts

  const totalIncomingValue = incomingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);
  const totalOutgoingValue = outgoingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);
  const totalDebtToUs = outgoingInvoices.filter(inv => inv.invoiceState != 1).reduce((sum, inv) => sum + inv.invoiceValue, 0);
  const totalDebtToSuppliers = incomingInvoices.filter(inv => inv.invoiceState != 1).reduce((sum, inv) => sum + inv.invoiceValue, 0);

  const shoot = (tst) => {
    alert("Great " + tst);
    setTest(5000); // Updating state without directly modifying it
  };

  return (
    <div className={styles.Home}>


      <div className="data">
        <div className="box">
          <div className="grey">
            <span>ВХОДНИ ФАКТУРИ</span> <i className="icon arrow"></i>
          </div>

          <div className="money">
            <span>{totalIncomingValue} лв</span>
          </div>
          <div className="chart-box"></div>
        </div>

        <div className="box">
          <div className="grey">
            <span>ИЗХОДНИ ФАКТУРИ</span> <i className="icon arrow"></i>
          </div>

          <div className="money">
            <span>{totalOutgoingValue} лв</span>
          </div>
          <div className="chart-box"></div>
        </div>

        <div className="box">
          <div className="grey">
            <span>ЗАДЪЛЖЕНИЯ КЪМ НАС</span>
          </div>

          <div className="money">
            <span>{totalDebtToUs} лв</span>
          </div>
          <div className="chart-box"></div>
        </div>

        <div className="box">
          <div className="grey">
            <span>ЗАДЪЛЖЕНИЯ КЪМ ДОСТ</span>
          </div>

          <div className="money">
            <span>{totalDebtToSuppliers} лв</span>
          </div>
          <div className="chart-box"></div>
        </div>

        <div className="box">
          <div className="grey">
            <span>ВХОДНИ ФАКТУРИ</span>
          </div>

          <div className="money">
            <span>----- лв</span>
          </div>
          <div className="chart-box"></div>
        </div>

        <div className="table-holder">
          <div className="table">
            <span className="text-table">Последните 10 входящи фактури</span>
            <table>
              <thead>
                <tr>
                  <th>Дата на фактурата</th>
                  <th>Доставчик</th>
                  <th>Стойност</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
              {incomingInvoices.slice(0, 10).map((invoice) => (
                <tr>
                  <td>{invoice.date}</td>
                  <td>{invoice.supplier}</td>
                  <td>{invoice.invoiceValue} лв</td>
                  <td>   {invoice.State === 0 ? (
                            <span className="badge-waiting">ЧАКА ПЛАЩАНЕ</span>
                        ) : invoice.State === 1 ? (
                          <span className="badge-paid">ПЛАТЕНА</span>
                        ) : invoice.State === 2 ? (
                          <span className="badge-failed">ПРОПУСНАТО ПЛАЩАНЕ</span>
                        ) : (
                            <h1>Unknown Status</h1>
                        )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className="table">
            <span className="text-table">Последните 10 изходящи фактури</span>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th>Дата на фактурата</th>
                  <th>Клиент</th>
                  <th>Стойност</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {outgoingInvoices.slice(0, 10).map((invoice) => (
                  <tr>
                    <td>{invoice.date}</td>
                    <td>{invoice.client}</td>
                    <td>{invoice.invoiceValue} лв</td>
                    <td>
                            {invoice.invoiceState === 0 ? (
                              <span className="badge-waiting">ЧАКА ПЛАЩАНЕ</span>
                          ) : invoice.invoiceState === 1 ? (
                            <span className="badge-paid">ПЛАТЕНА</span>
                          ) : invoice.invoiceState === 2 ? (
                            <span className="badge-failed">ПРОПУСНАТО ПЛАЩАНЕ</span>
                          ) : (
                              <h1>Unknown Status</h1>
                          )}
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
