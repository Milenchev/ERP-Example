import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AutoInvoices.module.css";
import { Outlet, Link, useParams } from "react-router-dom";

const AutoInvoices = () => {
    const currentPath = window.location.pathname; // Get current URL path
    const [autoInvoices, setAutoInvoices] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/automaticInvoices");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAutoInvoices(data.automaticInvoices); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const [searchTerm, setSearchTerm] = useState("");

    const filterAutoInvoices = autoInvoices.filter((autoInvoices) => autoInvoices.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази фактура?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteAutoInvoice?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setAutoInvoices((prevInvoices) => prevInvoices.filter((autoInvoice) => autoInvoice.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    return (
        <div className={styles.AutoInvoices}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span className={currentPath === "/Documents" ? "clicked" : ""}>
                        <i className='images sales'></i> <Link to='/Documents'>ПРОДАЖБИ</Link>
                    </span>
                    <span className={currentPath === "/Expenses" ? "clicked" : ""}>
                        <i className='images package'></i> <Link to='/Expenses'>РАЗХОДИ</Link>
                    </span>
                    <span className={currentPath === "/auto-invoice" ? "clicked" : ""}>
                        <i className='images repeat'></i> <Link to='/auto-invoice'>АВТОМАТИЧНИ ТАКСУВАНИЯ</Link>
                    </span>
                    <span className={currentPath === "/offers" ? "clicked" : ""}>
                        <i className='images mail'></i> <Link to='/offers'>ОФЕРТИ</Link>
                    </span>
                    <span className={currentPath === "/Expenses" ? "clicked" : ""}>
                        <i className='images mail'></i>ТОВАРИТЕЛНИЦИ
                    </span>
                </div>
            </div>

            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Автоматични такси</div>
                    <div className='header-Number'>({autoInvoices.length})</div>

                    <Link to={`/auto-invoice-add`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на такса
                        </div>
                    </Link>

                    <div className='search-holder'>
                        <i className='icon-search'></i>
                        <input type='text' placeholder='Търсене' name='defaultInput' id='defaultInput' />
                    </div>
                </div>

                <div className='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Дата в месеца</th>
                                <th>Клиент</th>
                                <th>Стойност</th>
                                <th>Тип на плащане</th>
                                <th>Брой неплатени</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterAutoInvoices.slice(0, 10).map((autoInvoice, index) => (
                                <tr>
                                    <td>{autoInvoice.uid}</td>
                                    <td>{autoInvoice.dateOfMonth}</td>
                                    <td>{autoInvoice.client}</td>
                                    <td>{autoInvoice.price} лв</td>
                                    <td>{autoInvoice.typeOfPayment}</td>

                                    <td>{autoInvoice.unpaid}</td>

                                    <td>
                                        <i className='icon-pen'></i>
                                        <i className='icon-print'></i>
                                        <i className='icon-bag'></i>
                                        <i
                                            className='icon-trash'
                                            onClick={() => handleDelete(autoInvoice.uid)}
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
                                    <span>Общо фактури: </span>
                                </td>
                                <td colSpan='2'>
                                    <span>Тотал:лв.</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

AutoInvoices.propTypes = {};

AutoInvoices.defaultProps = {};

export default AutoInvoices;
