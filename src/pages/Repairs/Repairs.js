import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Repairs.module.css";
import { Outlet, Link } from "react-router-dom";

const Repairs = () => {
    const [repairs, setRepairs] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/repairs");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setRepairs(data.repairs); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const filterRepairs = repairs.filter((repair) => repair.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази поправка?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteRepair?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setRepairs((prevRepairs) => prevRepairs.filter((repair) => repair.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    return (
        <div className={styles.Repairs}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span>
                        <i className='images box'></i> <Link to=''>ПОРЪЧКИ</Link>
                    </span>
                    <span>
                        <i className='images boxes'></i> <Link to='/Repairs'>РЕМОНТИ</Link>
                    </span>
                </div>
            </div>
            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Ремонти</div>
                    <div className='header-Number'>({repairs.length})</div>

                    <Link to={`/add-repair`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на ремонт
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
                                <th>Приет на</th>
                                <th>Вх. товарителница</th>
                                <th>Изпратен на</th>
                                <th>Изх. товарителница</th>
                                <th>Артикули </th>
                                <th>Статус </th>
                                <th>Действие </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterRepairs.map((repair, index) => (
                                <tr>
                                    <td>{repair.client}</td>
                                    <td>{repair.arrivalDate}</td>
                                    <td>{repair.shipmentNum}</td>
                                    <td>{repair.sentDate}</td>
                                    <td>{repair.outgoingShipmentNum}</td>
                                    <td>{repair.Articles}</td>
                                    <td>
                                        {repair.state === 0 ? (
                                            <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
                                        ) : repair.state === 1 ? (
                                            <span className='badge-paid'>ПЛАТЕНА</span>
                                        ) : repair.state === 2 ? (
                                            <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td>
                                        <Link to={`/work-repair?repair_id=${repair.uid}`}>
                                            <i className='icon-work'></i>
                                        </Link>
                                        <i
                                            className='icon-trash'
                                            onClick={() => handleDelete(repair.uid)}
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

Repairs.propTypes = {};

Repairs.defaultProps = {};

export default Repairs;
