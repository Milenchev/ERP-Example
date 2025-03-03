import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StoreHouse.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const StoreHouse = () => {
    const [storages, setStorages] = useState([]);
    const [storageName, setStorageName] = useState([]);
    const [item, setUpdatedStorages] = useState([{ id: 1, storageName: "" }]);

    const handleClick = async () => {
        try {
            var storageTotal = storages
                .reduce(
                    (acc, storage) =>
                        acc +
                        storage.quantity * storage.price * (1 - storage.discount / 100) +
                        storage.quantity * storage.price * (1 - storage.discount / 100) * 0.2,
                    0
                )
                .toFixed(2);

            const response = await fetch("http://localhost:5001/addStorage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    storageName: {
                        storageName: storageName,
                    },
                }), // Send your data here
            });

            const result = await response.json();
            console.log(result); // Handle response as needed
            window.history.go(-1);
        } catch (error) {
            console.error("Error:", error); // Handle errors
        }
    };

    return (
        <div className={styles.StoreHouse}>
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

            <div class='storage'>
                <input
                    className='storage-input'
                    type='text'
                    placeholder='Име на склад..'
                    name='defaultInput'
                    id='defaultInput'
                    value={storageName}
                    onChange={(e) => setStorageName(e.target.value)}
                />
                <div className='button-Add-storage'>
                    <i className='icon-add'></i>
                    <span onClick={handleClick}>Добавяне на Склад</span>
                </div>
            </div>
        </div>
    );
};

StoreHouse.propTypes = {};

StoreHouse.defaultProps = {};

export default StoreHouse;
