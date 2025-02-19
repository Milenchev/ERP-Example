import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./WorkRepair.module.css";
import { Outlet, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const WorkRepair = () => {
    const [repairs, setRepairs] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [responseArticles, setResponseArticles] = useState([]);
    const [repairInfo, setRepairInfo] = useState({});
    const [searchParams] = useSearchParams();
    const repair_id = searchParams.get("repair_id");

    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = ["Ремонт Батерия", "Ремонт оптрон", "Ремонт GSM", "Ремонт SIM", "Ремон SMA"];

    const handleCheckboxChange = (rowIndex, option) => {
        setSelectedOptions((prevSelected) => {
            const newSelected = [...prevSelected];
            if (!newSelected[rowIndex]) {
                newSelected[rowIndex] = [];
            }
            newSelected[rowIndex] = newSelected[rowIndex].includes(option)
                ? newSelected[rowIndex].filter((item) => item !== option)
                : [...newSelected[rowIndex], option];
            return newSelected;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/repairArticles`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                for (var i = 0; i < data.repairArticles.length; i++) {
                    if (data.repairArticles[i]["uid"] == repair_id) {
                        setRepairInfo(data.repairArticles[i]);
                        const repairArticles = await fetch("http://localhost:5001/getArticle_id?repair_id=" + repair_id);
                        if (repairArticles.ok) {
                            const data_products = await repairArticles.json();
                            console.log(data_products);
                            setResponseArticles(data_products.repairArticles);
                        }
                    }
                }

                setRepairs(data.repairArticles); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [repair_id]);

    return (
        <div className={styles.WorkRepair}>
            <div className='invoices-main-content-2'>
                <div className='main-content-header'>
                    <div className='header-Name'>Обработка на ремонт</div>
                </div>

                <div className='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th width='15%'>Сериен номер</th>
                                <th>Ремонтна дейност</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseArticles.map((responseArticle, rowIndex) => (
                                <tr key=''>
                                    <td width='15%'>{responseArticle.serialNum}</td>
                                    <td width='100%'>
                                        <div style={{ float: "left" }}>
                                            {options.map((option) => (
                                                <label key={option} style={{ float: "left", width: "220px", marginBottom: "5px" }}>
                                                    <input
                                                        type='checkbox'
                                                        checked={selectedOptions[rowIndex]?.includes(option) || false}
                                                        onChange={() => handleCheckboxChange(rowIndex, option)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
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

WorkRepair.propTypes = {};

WorkRepair.defaultProps = {};

export default WorkRepair;
