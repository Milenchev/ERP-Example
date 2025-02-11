import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Documents.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const Documents = () => {
    const [outgoingInvoices, setOutgoingInvoices] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [activeLink, setActiveLink] = useState(null);
    const totalOutgoingValue = outgoingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/outgoingInvoices");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOutgoingInvoices(data.outgoingInvoices); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази фактура?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteOutgoingInvoices?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setOutgoingInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filterOutgoingInvoices = outgoingInvoices.filter((invoice) => invoice.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleClick = (e) => {
        const parentElement = e.target.closest("span");
        if (parentElement) {
            setActiveLink(parentElement);
            console.log(activeLink);
        }
    };

    return (
        <div className={styles.Documents}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span className={activeLink && activeLink.textContent === "ПРОДАЖБИ" ? "clicked" : ""} onClick={handleClick}>
                        <i className='images sales'></i> <Link to='/Documents'>ПРОДАЖБИ</Link>
                    </span>

                    <span className={activeLink === "/Expenses" ? "clicked" : ""} onClick={handleClick}>
                        <i className='images package'></i> <Link to='/Expenses'>РАЗХОДИ</Link>
                    </span>
                    <span onClick={handleClick}>
                        {" "}
                        <i className='images repeat'></i> АВТОМАТИЧНИ ТАКСУВАНИЯ
                    </span>
                    <span>
                        {" "}
                        <i className='images mail'></i>
                        <Link to='/offers'>ОФЕРТИ</Link>
                    </span>
                    <span onClick={handleClick}>
                        {" "}
                        <i className='images mail'></i> ТОВАРИТЕЛНИЦИ
                    </span>
                </div>
            </div>

            <div class='left-menu'>
                <div class='left-menu-content'>
                    <span class='content-header'>Тип Документ</span>
                    <span class='content'>Всички</span>
                    <span class='content'>Фактури</span>
                    <span class='content-default'>Проформа фактури</span>
                </div>
            </div>

            <div class='invoices-main-content'>
                <div class='main-content-header'>
                    <div class='header-Name'>Изходящи фактури</div>
                    <div class='header-Number'>({outgoingInvoices.length})</div>

                    <div class='btn-2'>
                        <i class='icon-up'></i>
                        Справка
                    </div>

                    <Link to={`/add-invoice`}>
                        {" "}
                        <div class='button-Add'>
                            <i class='icon-add'></i>
                            Добавяне на фактура
                        </div>
                    </Link>
                    <div class='search-holder'>
                        <i class='icon-search'></i>
                        <input type='text' placeholder='Търсене' name='defaultInput' id='defaultInput' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div class='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th width='3%'>#</th>
                                <th width='20%'>Дата на издаване</th>
                                <th>Тип</th>
                                <th>Клиент</th>
                                <th>Стойност</th>
                                <th>Тип на плащане</th>
                                <th>Статус</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody class='invoices-th'>
                            {filterOutgoingInvoices.map((invoice, index) => (
                                <tr>
                                    <td width='3%'>{index + 1}</td>
                                    <td width='20%'>{invoice.date}</td>
                                    <td>{invoice.type === 0 ? <span> Фактура</span> : invoice.type === 1 ? <span> Проформа фактура</span> : <h1>Unknown Status</h1>}</td>
                                    <td>{invoice.client}</td>
                                    <td>{invoice.invoiceValue} лв</td>
                                    <td>
                                        {invoice.typeOfPayment === 0 ? (
                                            <span>Банков път</span>
                                        ) : invoice.typeOfPayment === 1 ? (
                                            <span>В брой</span>
                                        ) : invoice.typeOfPayment === 2 ? (
                                            <span>Пощенски паричен</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td class='status'>
                                        {invoice.invoiceState === 0 ? (
                                            <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
                                        ) : invoice.invoiceState === 1 ? (
                                            <span className='badge-paid'>ПЛАТЕНА</span>
                                        ) : invoice.invoiceState === 2 ? (
                                            <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td class='icons'>
                                        <i class='icon-pen'></i>
                                        <Link to={`/view-invoice?invoice_id=${index}`}>
                                            <i class='icon-print'></i>
                                        </Link>
                                        <i class='icon-bag'></i>
                                        <i
                                            class='icon-trash'
                                            onClick={() => handleDelete(invoice.uid)}
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                            }}
                                        >
                                            {" "}
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='6' style={{ textAlign: "left" }}>
                                    <span>Общо фактури: {outgoingInvoices.length}</span>
                                </td>
                                <td colSpan='2'>
                                    <span>Тотал: {totalOutgoingValue.toFixed()} лв.</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

Documents.propTypes = {};

Documents.defaultProps = {};

export default Documents;
