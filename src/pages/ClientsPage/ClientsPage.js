import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, Link } from "react-router-dom";
import styles from "./ClientsPage.module.css";

const ClientsPage = () => {
    const [clients, setClients] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/clients");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.clients);
                setClients(data.clients); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете този клиент?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteClients?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setClients((prevInvoices) => prevInvoices.filter((invoice) => invoice.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filterClients = clients.filter((client) => client.firmName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={styles.ClientsPage}>
            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Клиенти</div>
                    <div className='header-Number'>({clients.length})</div>

                    <Link to={`/add-clients`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на Клиент
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
                                <th>Клиент</th>
                                <th>МОЛ</th>
                                <th>Тип</th>
                                <th>ЕИК/ЕГН</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterClients.map((client, index) => (
                                <tr>
                                    <td>{client.firmName}</td>
                                    <td>{client.mol}</td>
                                    <td>
                                        {client.clientType === 0 ? (
                                            <span>Частно лице</span>
                                        ) : client.clientType === 1 ? (
                                            <span>Фирма</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td>{client.eik}</td>

                                    <td>
                                        <i className='icon-pen'></i>
                                        <i
                                            className='icon-trash'
                                            onClick={() => handleDelete(client.uid)}
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ClientsPage.propTypes = {};

ClientsPage.defaultProps = {};

export default ClientsPage;
