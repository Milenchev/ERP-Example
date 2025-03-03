import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddStoreHouseParts.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const AddStoreHouseParts = () => {
    const [storages, setStorages] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [itemNum, setItemNum] = useState(0);
    const [itemName, setItemName] = useState("");
    const [Availability, setAvailability] = useState(0);
    const [storageType, setStorageType] = useState(0);
    const [type, setType] = useState(0);
    const [position, setPositions] = useState("");
    const [item, setItems] = useState([{ id: 1, itemNum: "", itemName: "бр.", Availability: 0, storageType: 0, type: 0, position: "" }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/storage");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setStorages(data.storage);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const handleClick = async () => {
        try {
            var invoiceTotalValue = item
                .reduce(
                    (acc, items) =>
                        acc +
                        items.quantity * items.price * (1 - items.discount / 100) +
                        items.quantity * items.price * (1 - items.discount / 100) * 0.2,
                    0
                )
                .toFixed(2);

            const response = await fetch("http://localhost:5001/addItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    storageItems: {
                        itemNum: itemNum,
                        itemName: itemName,
                        Availability: Availability,
                        storageType: storageType,
                        type: type,
                        position: position,
                        items: item,
                    },
                }),
            });

            const result = await response.json();
            console.log(result); // Handle response as needed
            window.history.go(-1);
        } catch (error) {
            console.error("Error:", error); // Handle errors
        }
    };

    return (
        <div className={styles.AddStoreHouseParts}>
            <div className='add-fax-holder'>
                <div style={{ marginBottom: "15px" }} className='add-fax-header'>
                    <span>Добавяне на артикул</span>
                </div>

                <div className='addItem-holder'>
                    <div className='row'>
                        <span style={{ marginBottom: "15px", fontWeight: "Bold" }}>Тип на складов артикул</span>
                        <div className='col-3 input-row'>
                            <span>Складов тип</span>
                            <select
                                style={{ float: "left", width: "100%", height: "40px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={storageType}
                                onChange={(e) => setStorageType(e.target.value)}
                            >
                                <option value='0'>Складов</option>
                                <option value='1'>Реален</option>
                            </select>
                        </div>

                        <div style={{ marginLeft: "30px" }} className='col-3 input-row'>
                            <span>Количество</span>
                            <input
                                style={{ float: "left", height: "35px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={Availability}
                                onChange={(e) => setAvailability(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className='row'>
                        <span style={{ marginTop: "15px", marginBottom: "15px", fontWeight: "Bold" }}>Основна информация</span>
                        <div className='col-2 input-row'>
                            <span>Име артикул</span>
                            <input
                                style={{ float: "left", height: "40px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>

                        <div className='col-2 input-row'>
                            <span>Артикул номер</span>
                            <input
                                style={{ float: "left", height: "40px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={itemNum}
                                onChange={(e) => setItemNum(e.target.value)}
                            />
                        </div>

                        <div className='col-3 input-row'>
                            <span>Тип артикул</span>
                            <select
                                style={{ float: "left", height: "45px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value='0'>Производство</option>
                                <option value='1'>Части</option>
                            </select>
                        </div>
                        <div className='col-3 input-row'>
                            <span>Позиция</span>
                            <input
                                style={{ float: "left", height: "40px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={position}
                                onChange={(e) => setPositions(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-2 input-row'>
                            <span
                                style={{
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                    fontWeight: "Bold",
                                    width: "90%",
                                    float: "left",
                                }}
                            >
                                Складова информация
                            </span>

                            <span>Склад</span>
                            <select style={{ height: "40px" }} id='expDate' name='expDate'>
                                {storages.map((current_storage, index) => (
                                    <option value='current_storage.uid'>{current_storage.storageName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div className='btn-add'>
                        <span style={{ paddingLeft: "15px" }} onClick={handleClick}>
                            Запис
                        </span>
                    </div>

                    <Link to='/Expenses'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AddStoreHouseParts.propTypes = {};

AddStoreHouseParts.defaultProps = {};

export default AddStoreHouseParts;
