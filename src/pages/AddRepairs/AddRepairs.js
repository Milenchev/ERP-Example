import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddRepairs.module.css";
import { Outlet, Link } from "react-router-dom";

const AddRepairs = () => {
    const [client, setClient] = useState("");
    const [arrivalDate, setArrivalDate] = useState(0);
    const [shipmentNum, setShipmentNum] = useState("");
    const [sentDate, setSentDate] = useState(0);
    const [outgoingShipmentNum, setOutgoingShipmentNum] = useState("");
    const [articles, setArticles] = useState(0);
    const [state, setState] = useState(0);
    const [serialNum, setSerialNum] = useState(0);
    const [repairArticles, setRepairArticles] = useState([{ id: 1, serialNum: "" }]);

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5001/addRepair", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    repairs: {
                        client: client,
                        arrivalDate: arrivalDate,
                        shipmentNum: shipmentNum,
                        sentDate: sentDate,
                        outgoingShipmentNum: outgoingShipmentNum,
                        Articles: articles,
                        state: state,
                        serialNum: serialNum,
                        repairArticles: repairArticles,
                    },
                }), // Send your data here
            });

            const result = await response.json();
            window.history.go(-1);
        } catch (error) {
            console.error("Error:", error); // Handle errors
        }
    };

    const handleInputChange = (id, e, index, key) => {
        // Update the product details
        let updatedRepairs = repairArticles.map((item) => (item.id === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === repairArticles.length - 1 && e.target.value !== "") {
            updatedRepairs = [
                ...updatedRepairs,
                {
                    id: repairArticles.length + 1,
                    serialNum: "",
                },
            ];
        }

        setRepairArticles(updatedRepairs);
    };

    const handleDeleteRow = (id) => {
        setRepairArticles(repairArticles.filter((item) => item.id !== id));
    };
    return (
        <div className={styles.AddRepairs}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на ремонт</span>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-3 input-row'>
                            <span>Клиент</span>
                            <input
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                            />
                        </div>

                        <div className='col-3 input-row'>
                            <span>Дата на пристигане</span>
                            <input
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                            />
                        </div>

                        <div className='col-2 input-row'>
                            <span>Входна товарителница</span>
                            <input
                                class='width-90'
                                type='text'
                                name='name'
                                value={shipmentNum}
                                onChange={(e) => setShipmentNum(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th width='5%'>№</th>
                            <th width='90%'>Сериен номер</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairArticles.map((repair, index) => (
                            <tr key=''>
                                <td width='3%'>{repair.id}</td>
                                <td width='100%'>
                                    {" "}
                                    <input
                                        style={{ width: "93%", float: "left", marginTop: "5px" }}
                                        type='text'
                                        name='serialNum'
                                        value={repair.serialNum}
                                        onChange={(e) => handleInputChange(repair.id, e, index, "serialNum")}
                                    ></input>
                                    {index != 0 && <div class='icon-delete' onClick={() => handleDeleteRow(repair.id)}></div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='footer'>
                    <div className='btn-add' onClick={handleClick}>
                        <span>Добавяне</span>
                    </div>
                    <Link to='/Repairs'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
AddRepairs.propTypes = {};

AddRepairs.defaultProps = {};

export default AddRepairs;
