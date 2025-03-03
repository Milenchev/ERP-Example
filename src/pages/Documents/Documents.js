import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Documents.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Table from "../../components/Table";

const Documents = () => {
    const location = useLocation(); // Get current location (path)

    // Check if the current path matches the link
    const isActive = (path) => location.pathname === path;
    const [outgoingInvoices, setOutgoingInvoices] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const totalOutgoingValue = outgoingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);

    const columns = [
        { header: "#", key: "index", width: "3%" },
        { header: "Дата на издаване", key: "date" },
        { header: "Тип", key: "type" },
        { header: "Клиент", key: "client" },
        { header: "Стойност", key: "invoiceValue" },
        { header: "Тип на плащане", key: "typeOfPayment" },
        { header: "Статус", key: "invoiceState" },
        { header: "Действия", key: "actions" },
    ];

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

    const tableData = filterOutgoingInvoices.map((invoice, index) => ({
        index: index + 1,
        ...invoice,
        invoiceState:
            invoice.invoiceState === 0 ? (
                <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
            ) : invoice.invoiceState === 1 ? (
                <span className='badge-paid'>ПЛАТЕНА</span>
            ) : invoice.invoiceState === 2 ? (
                <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
            ) : (
                <h1>Unknown Status</h1>
            ),

        type: invoice.type === 0 ? <span>Фактура</span> : invoice.type === 1 ? <span>Проформа фактура</span> : <h1>Unknown Status</h1>,
        typeOfPayment:
            invoice.typeOfPayment === 0 ? (
                <span>Банков път</span>
            ) : invoice.typeOfPayment === 1 ? (
                <span>В брой</span>
            ) : invoice.typeOfPayment === 2 ? (
                <span>Пощенски паричен</span>
            ) : (
                <h1>Unknown Status</h1>
            ),

        // Add actions column
        actions: (
            <div className='icons'>
                <i className='icon-pen'></i>
                <Link to={`/view-invoice?invoice_id=${invoice.uid}`}>
                    <i className='icon-print'></i>
                </Link>
                <i className='icon-bag'></i>
                <i
                    className='icon-trash'
                    onClick={() => handleDelete(invoice.uid)}
                    style={{
                        cursor: "pointer",
                        color: "red",
                    }}
                ></i>
            </div>
        ),
    }));

    return (
        <div className={styles.Documents}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span className={isActive("/Documents") ? "clicked" : ""}>
                        <i className='images sales'></i>
                        <NavLink to='/Documents'>ПРОДАЖБИ</NavLink>
                    </span>
                    <span className={isActive("/Expenses") ? "clicked" : ""}>
                        <i className='images package'></i>
                        <NavLink to='/Expenses'>РАЗХОДИ</NavLink>
                    </span>
                    <span className={isActive("/auto-invoice") ? "clicked" : ""}>
                        <i className='images repeat'></i>
                        <NavLink to='/auto-invoice'>АВТОМАТИЧНИ ТАКСУВАНИЯ</NavLink>
                    </span>
                    <span className={isActive("/offers") ? "clicked" : ""}>
                        <i className='images mail'></i>
                        <NavLink to='/offers'>ОФЕРТИ</NavLink>
                    </span>
                    <span className={isActive("/waybills") ? "clicked" : ""}>
                        <i className='images mail'></i>
                        <NavLink to='/waybills'>ТОВАРИТЕЛНИЦИ</NavLink>
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

                <div class='invoices-table'>
                    <div className='invoices-table'>
                        <div className='invoices-table'>
                            <Table data={tableData} columns={columns} showActions={true} onDelete={handleDelete} />
                        </div>
                    </div>
                    <table>
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
