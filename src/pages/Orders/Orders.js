import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Orders.module.css";
import { Outlet, Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/orders");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setOrders(data.orders); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const filterOrders = orders.filter((order) => order.client.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className={styles.Orders}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span>
                        <i className='images box'></i> <Link to='/orders'>ПОРЪЧКИ</Link>
                    </span>
                    <span>
                        <i className='images boxes'></i> <Link to='/Repairs'>РЕМОНТИ</Link>
                    </span>
                </div>
            </div>

            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Поръчки</div>
                    <div className='header-Number'>({orders.length})</div>

                    <Link to={`/add-order`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на поръчка
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
                                <th>Подадена на</th>
                                <th>Изпратен на</th>
                                <th>Изх. товарителница</th>
                                <th>Стойност </th>
                                <th>Статус </th>
                                <th>Действие </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterOrders.map((order, index) => (
                                <tr>
                                    <td>{order.client}</td>
                                    <td>{order.dateApplied}</td>
                                    <td>{order.dateSent}</td>
                                    <td>{order.outgoingShipmentNum}</td>
                                    <td>{order.price} лв.</td>
                                    <td>
                                        {order.state === 0 ? (
                                            <span className='badge-waiting'>ЧАКА ИЗПРАЩАНЕ</span>
                                        ) : order.state === 1 ? (
                                            <span className='badge-paid'>ИЗПРАТЕНА</span>
                                        ) : order.state === 2 ? (
                                            <span style={{ fontSize: "10px" }} className='badge-failed'>
                                                НЕИЗПРАТЕНА
                                            </span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>

                                    <td>
                                        <Link to=''>
                                            <i className='icon-menu'></i>
                                        </Link>
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

Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
