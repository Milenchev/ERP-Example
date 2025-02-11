import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StoreHouseParts.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const StoreHouseParts = () => {
    const [storage, setStorage] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/storageItems");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setStorage(data.storageItems); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); //

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази фактура?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteStorageItems?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setStorage((prevStorageItems) => prevStorageItems.filter((storageItem) => storageItem.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filterStorages = storage.filter((storage) => storage.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={styles.StoreHouseParts}>
            <div className='invoices-nav'>
                <div className='invoices-menu'>
                    <span>
                        <i className='images box'></i> <Link to=''>ДОСТАВЧИЦИ</Link>
                    </span>
                    <span>
                        <i className='images boxes'></i> <Link to='/storeHouseParts'>СКЛАДОВЕ</Link>
                    </span>
                    <span>
                        <i className='images boxes'></i> <Link to=''>ПРОИЗВОДСТВО</Link>
                    </span>
                </div>
            </div>

            <div class='left-menu'>
                <div class='left-menu-storeHouse'>
                    <span class='content-header'>Складове</span>
                    <span class='content'>Axion Офис</span>
                    <span class='content-default'>Хотел Есте Парк </span>
                </div>
                <Link to='/storeHouse'>
                    <span class='content-default-1'>Добави Склад</span>
                </Link>
            </div>

            <div class='invoices-main-content'>
                <div class='main-content-header'>
                    <div class='header-Name' style={{ fontSize: "16px", marginTop: "7px" }}>
                        Склад - Axion Офис
                    </div>
                    <div class='header-Number' style={{ fontSize: "16px", marginTop: "7px" }}>
                        ()
                    </div>

                    <Link to={`/`}>
                        {" "}
                        <div style={{ width: "10%", marginRight: "25px" }} class='button-Add'>
                            <i class='icon-add'></i>
                            Добавяне
                        </div>
                    </Link>
                    <div class='search-holder'>
                        <i class='icon-search'></i>
                        <input type='text' placeholder='Търсене' name='defaultInput' id='defaultInput' />
                    </div>
                </div>

                <div class='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th width='5%'>#</th>
                                <th width='10%'>Арт. номер</th>
                                <th width='20%'>Име на компонент</th>
                                <th width='10%'>Наличност</th>
                                <th>Складов тип</th>
                                <th>Тип</th>
                                <th>Позиция</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody class='invoices-th'>
                            {storage.map((storage, index) => (
                                <tr>
                                    <td width='5%'>{storage.uid}</td>
                                    <td width='10%'>{storage.itemNum}</td>
                                    <td width='20%'>{storage.itemName}</td>
                                    <td width='10%'>{storage.Availability}</td>
                                    <td>
                                        {storage.storageType === 0 ? (
                                            <span>Реален</span>
                                        ) : storage.storageType === 1 ? (
                                            <span>Виртуален</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>
                                    <td>
                                        {storage.type === 0 ? (
                                            <span>Производство</span>
                                        ) : storage.type === 1 ? (
                                            <span>Части</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>
                                    <td>{storage.position}</td>

                                    <td class='icons'>
                                        <i class='icon-pen'></i>
                                        <Link to={``}>
                                            <i class='icon-print'></i>
                                        </Link>
                                        <i class='icon-bag'></i>
                                        <i
                                            class='icon-trash'
                                            onClick={() => handleDelete(storage.uid)}
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
                                    <span>Общо фактури: </span>
                                </td>
                                <td colSpan='2'>
                                    <span>Тотал: лв.</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

StoreHouseParts.propTypes = {};

StoreHouseParts.defaultProps = {};

export default StoreHouseParts;
