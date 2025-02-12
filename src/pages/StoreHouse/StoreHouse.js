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
            // let date_split = faxDate.split(".");
            // let exp_date = new Date(date_split[1] + "." + date_split[0] + "." + date_split[2]);
            // exp_date.setDate(exp_date.getDate() + 15);
            // let exp_date_format = exp_date.getDate() + "." + (exp_date.getMonth() + 1) + "." + exp_date.getFullYear();
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

    const handleInputChange = (id, e, index, key) => {
        // Update the product details
        let updatedStorages = item.map((item) => (item.id === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === item.length - 1 && e.target.value !== "") {
            updatedStorages = [
                ...updatedStorages,
                {
                    id: item.length + 1,
                    storageName: storageName,
                },
            ];
        }

        setUpdatedStorages(updatedStorages);
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
