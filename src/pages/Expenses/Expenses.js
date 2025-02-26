import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import { Outlet, Link } from "react-router-dom";

const Expenses = () => {
    const [incomingInvoices, setIncomingInvoices] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const totalIncomingValue = incomingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/incomingInvoices");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setIncomingInvoices(data.incomingInvoices); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const [searchTerm, setSearchTerm] = useState("");

    const filterIncomingInvoices = incomingInvoices.filter((invoice) => invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази фактура?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteIncomingInvoices?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setIncomingInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    return (
        <div className={styles.Expenses}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span>
                        {" "}
                        <i className='images sales'></i> <Link to='/Documents'>ПРОДАЖБИ</Link>
                    </span>
                    <span>
                        {" "}
                        <i className='images package'></i> <Link to='/Expenses'>РАЗХОДИ</Link>
                    </span>
                    <span>
                        {" "}
                        <i className='images repeat'></i> <Link to='/auto-invoice'>АВТОМАТИЧНИ ТАКСУВАНИЯ</Link>
                    </span>
                    <span>
                        {" "}
                        <i className='images mail'></i> <Link to='/offers'>ОФЕРТИ</Link>
                    </span>
                    <span>
                        {" "}
                        <i className='images mail'></i> ТОВАРИТЕЛНИЦИ
                    </span>
                </div>
            </div>

            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Входящи фактури</div>
                    <div className='header-Number'>({incomingInvoices.length})</div>

                    <Link to={`/add-incoming-invoice`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на фактура
                        </div>
                    </Link>

                    <div className='search-holder'>
                        <i className='icon-search'></i>
                        <input
                            type='text'
                            placeholder='Търсене'
                            name='defaultInput'
                            id='defaultInput'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Дата на фактурата</th>
                                <th>Доставчик</th>
                                <th>Стойност</th>
                                <th>Дата на изтичане</th>
                                <th>Статус</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterIncomingInvoices.slice(0, 10).map((invoice, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{invoice.date}</td>
                                    <td>{invoice.supplier}</td>
                                    <td>{invoice.invoiceValue} лв</td>
                                    <td>{invoice.expDate}</td>

                                    <td>
                                        {invoice.State === 0 ? (
                                            <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
                                        ) : invoice.State === 1 ? (
                                            <span className='badge-paid'>ПЛАТЕНА</span>
                                        ) : invoice.State === 2 ? (
                                            <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td>
                                        <i className='icon-pen'></i>
                                        <i className='icon-print'></i>
                                        <i className='icon-bag'></i>
                                        <i
                                            className='icon-trash'
                                            onClick={() => handleDelete(invoice.uid)}
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='6' style={{ textAlign: "left" }}>
                                    <span>Общо фактури: {incomingInvoices.length}</span>
                                </td>
                                <td colSpan='2'>
                                    <span>Тотал: {totalIncomingValue} лв.</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

Expenses.propTypes = {};

Expenses.defaultProps = {};

export default Expenses;
