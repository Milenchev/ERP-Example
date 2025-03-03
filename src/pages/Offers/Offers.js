import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Offers.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Table from "../../components/Table";

const Offers = () => {
    const [activeLink, setActiveLink] = useState(null);

    const [offers, setOffers] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const columns = [
        { header: "Дата", key: "dateOfOffer" },
        { header: "Заглавие", key: "heading" },
        { header: "Клиент", key: "clientName" },
        { header: "Стойност", key: "price" },
        { header: "Тип", key: "typeOfOffer" },
        { header: "Статус", key: "state" },
        { header: "Действия", key: "actions" },
    ];

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/offers");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOffers(data.offers); // Store fetched data in state
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
            const response = await fetch(`http://localhost:5001/deleteOffers?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setOffers((prevInvoices) => prevInvoices.filter((invoice) => invoice.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const handleClick = (e) => {
        const parentElement = e.target.closest("span");
        if (parentElement) {
            setActiveLink(parentElement);
            console.log(activeLink);
        }
    };

    const tableData = offers.map((offer, index) => ({
        index: index + 1,
        ...offer,
        state:
            offer.state === 0 ? (
                <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
            ) : offer.state === 1 ? (
                <span className='badge-paid'>ПЛАТЕНА</span>
            ) : offer.state === 2 ? (
                <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
            ) : (
                <h1>Unknown Status</h1>
            ),

        typeOfOffer:
            offer.typeOfOffer === 0 ? <span>Фактура</span> : offer.typeOfOffer === 1 ? <span>Проформа фактура</span> : <h1>Unknown Status</h1>,

        actions: (
            <div className='icons'>
                <i className='icon-pen'></i>

                <i className='icon-print'></i>

                <i className='icon-bag'></i>
                <i
                    className='icon-trash'
                    onClick={() => handleDelete(offer.uid)}
                    style={{
                        cursor: "pointer",
                        color: "red",
                    }}
                ></i>
            </div>
        ),
    }));

    return (
        <div className={styles.Offers}>
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
                        <i className='images repeat'></i> <Link to='/auto-invoice'>АВТОМАТИЧНИ ТАКСУВАНИЯ</Link>
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

            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Оферти</div>

                    <div className='header-Number'>({offers.length})</div>

                    <Link to={`/add-offer`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на оферта
                        </div>
                    </Link>

                    <div className='search-holder'>
                        <i className='icon-search'></i>
                        <input type='text' placeholder='Търсене' name='defaultInput' id='defaultInput' />
                    </div>
                </div>

                <div className='invoices-table'>
                    <div className='invoices-table'>
                        <Table data={tableData} columns={columns} showActions={true} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Offers.propTypes = {};

Offers.defaultProps = {};

export default Offers;
