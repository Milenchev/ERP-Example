import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StoreHouse.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const StoreHouse = () => {
    const [activeLink, setActiveLink] = useState(null);
    const handleClick = (e) => {
        const parentElement = e.target.closest("span");
        if (parentElement) {
            setActiveLink(parentElement);
            console.log(activeLink);
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
                <input className='storage-input' type='text' placeholder='Име на склад..' name='defaultInput' id='defaultInput' />
                <div className='button-Add-storage'>
                    <i className='icon-add'></i>
                    Добавяне на Склад
                </div>
            </div>
        </div>
    );
};

StoreHouse.propTypes = {};

StoreHouse.defaultProps = {};

export default StoreHouse;
