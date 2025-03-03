import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Employees.module.css";
import { Outlet, Link } from "react-router-dom";
import Table from "../../components/Table";

const Employees = () => {
    const [employees, setEmployees] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const columns = [
        { header: "Име", key: "name" },
        { header: "Заплата", key: "salary" },
        { header: "Осигуровки", key: "insurance" },
        { header: "Данък", key: "tax" },
        { header: "Допълнение", key: "additionalPay" },
        { header: "Общо", key: "total" },
    ];

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/employees");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setEmployees(data.employees); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts
    const [searchTerm, setSearchTerm] = useState("");

    const filterEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const tableData = filterEmployees.map((employee) => ({
        ...employee,
        total: employee.salary + employee.insurance - employee.tax + employee.additionalPay,
    }));

    return (
        <div className={styles.Employees}>
            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Служители</div>
                    <div className='header-Number'>({employees.length})</div>

                    <Link to={`/add-employee`}>
                        {" "}
                        <div className='button-Add-2'>
                            <i className='icon-add'></i>
                            Добавяне на служител
                        </div>
                    </Link>
                </div>

                <div className='invoices-table'>
                    <Table data={tableData} columns={columns} />
                </div>
            </div>
        </div>
    );
};

Employees.propTypes = {};

Employees.defaultProps = {};

export default Employees;
