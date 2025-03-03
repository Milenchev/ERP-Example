import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Repairs.module.css";
import { Outlet, Link } from "react-router-dom";
import Table from "../../components/Table";

const Repairs = () => {
    const [repairs, setRepairs] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const columns = [
        { header: "Клиент", key: "client" },
        { header: "Приет на", key: "arrivalDate" },
        { header: "Вх. товарителница", key: "shipmentNum" },
        { header: "Изпратен на", key: "sentDate" },
        { header: "Изх. товарителница", key: "outgoingShipmentNum" },
        { header: "Артикули", key: "Articles" },
        { header: "Статус", key: "state" },
        { header: "Действия", key: "actions" },
    ];

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

    const tableData = filterRepairs.map((repair) => ({
        ...repair,
        state:
            repair.state === 0 ? (
                <span className='badge-waiting'>ЧАКА ПЛАЩАНЕ</span>
            ) : repair.state === 1 ? (
                <span className='badge-paid'>ПЛАТЕНА</span>
            ) : repair.state === 2 ? (
                <span className='badge-failed'>ПРОПУСНАТО ПЛАЩАНЕ</span>
            ) : (
                <h1>Unknown Status</h1>
            ),

        actions: (
            <div className='icons'>
                <i className='icon-pen'></i>

                <i className='icon-bag'></i>
                <i
                    className='icon-trash'
                    onClick={() => handleDelete(repair.uid)}
                    style={{
                        cursor: "pointer",
                        color: "red",
                    }}
                ></i>
            </div>
        ),
    }));

    return (
        <div className={styles.Repairs}>
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
                    <div className='invoices-table'>
                        <Table data={tableData} columns={columns} showActions={true} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Repairs.propTypes = {};

Repairs.defaultProps = {};

export default Repairs;
