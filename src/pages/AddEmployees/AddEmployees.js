import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddEmployees.module.css";
import { Outlet, Link } from "react-router-dom";

const AddEmployees = () => {
    const [name, setName] = useState("");
    const [salary, setSalary] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [tax, setTax] = useState(0);
    const [additionalPay, setAdditionalPay] = useState(0);

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5001/addEmployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employees: {
                        name: name,
                        salary: salary,
                        insurance: insurance,
                        tax: tax,
                        additionalPay: additionalPay,
                    },
                }), // Send your data here
            });

            const result = await response.json();

            window.history.go(-1);
        } catch (error) {
            console.error("Error:", error); // Handle errors
        }
    };
    return (
        <div className={styles.AddEmployees}>
            {" "}
            <div className='add-clients-header'>
                <span>Добавяне на служител</span>
            </div>
            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <span className='add-input-name'>Основна информация:</span>
                    <span className='add-input-name' style={{ fontSize: "12px" }}>
                        (Име, Заплата, Осигуровки)
                    </span>
                    <input className='col-10' type='text' placeholder='Име: ' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <input className='col-3' type='text' placeholder='Заплата: ' value={salary} onChange={(e) => setSalary(e.target.value)} />
                    <input
                        className='col-3'
                        type='text'
                        placeholder='Осигуровки: '
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                    />
                </div>
            </div>
            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <span className='add-input-name'>Допълнителна информация:</span>
                    <span className='add-input-name' style={{ fontSize: "12px" }}>
                        (Данък, Допълнение)
                    </span>
                    <input className='col-3' type='text' placeholder='Данък: ' value={tax} onChange={(e) => setTax(e.target.value)} />
                    <input
                        className='col-3'
                        type='text'
                        placeholder='Допълнение: '
                        value={additionalPay}
                        onChange={(e) => setAdditionalPay(e.target.value)}
                    />
                </div>
            </div>
            <div className='add-input-btns'>
                <div className='add-input-add' onClick={handleClick}>
                    <span>Запис</span>
                </div>
                <Link to={`/employees`}>
                    {" "}
                    <div className='add-input-cancel'>
                        <span>Отказ</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

AddEmployees.propTypes = {};

AddEmployees.defaultProps = {};

export default AddEmployees;
