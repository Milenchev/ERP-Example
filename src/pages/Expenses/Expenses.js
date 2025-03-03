import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import { Outlet, Link } from "react-router-dom";
import Table from "../../components/Table";

const Expenses = () => {
    const [incomingInvoices, setIncomingInvoices] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const totalIncomingValue = incomingInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0);

    const columns = [
        { header: "Номер", key: "index", width: "3%" },
        { header: "Дата на фактурата", key: "date" },
        { header: "Доставчик", key: "supplier" },
        { header: "Стойност", key: "invoiceValue" },
        { header: "Дата на изтичане", key: "expDate" },
        { header: "Статус", key: "State" },
        { header: "Действия", key: "actions" },
    ];

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
    const tableData = filterIncomingInvoices.map((invoice, index) => ({
        index: index + 1,
        ...invoice,
        State:
            invoice.State === 0 ? (
                <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
            ) : invoice.State === 1 ? (
                <span className='badge-paid'>ПЛАТЕНА</span>
            ) : invoice.State === 2 ? (
                <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
            ) : (
                <h1>Unknown Status</h1>
            ),

        actions: (
            <div className='icons'>
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
            </div>
        ),
    }));

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
                    <div className='invoices-table'>
                        <div className='invoices-table'>
                            <Table data={tableData} columns={columns} showActions={true} onDelete={handleDelete} />
                        </div>
                    </div>
                    <table>
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
