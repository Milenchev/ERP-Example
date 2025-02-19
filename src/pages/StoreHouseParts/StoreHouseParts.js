import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StoreHouseParts.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StoreHouseParts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storages, setStorages] = useState([]);
    const [storageItems, setStorageItems] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState(0);

    // HTTP HANDLER VARIABLES
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // FILTER SEARCH VARIABLE
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch data from RESTful API
    useEffect(() => {
        const fetchDataStorage = async () => {
            try {
                const response = await fetch("http://localhost:5001/storage");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setStorages(data.storage); // Store fetched data in state
                if (data.storage.length > 0) {
                    data.storage[0].selected = true;
                    setSelectedStorage(data.storage[0].uid); // Fixing this line to reference 'storages'
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDataStorage();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази фактура?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/deleteStorageItems?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update state to remove the deleted invoice
            setStorages((prevStorageItems) => prevStorageItems.filter((storageItem) => storageItem.uid !== id));
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const handleDeleteStorage = async (storageId) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете този склад?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/deleteStorage?id=${storageId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // fetchStorageItemsOnSelect(storages[0].uid);
            var tempStorages = storages;
            if (tempStorages.filter((storage) => storage.uid === storageId && storage.selected).length > 0) {
                for (var si = 0; si < tempStorages.length; si++) {
                    if (si === 0) {
                        tempStorages[si].selected = true;
                        setSelectedStorage(tempStorages[si]["uid"]);
                        try {
                            const response = await fetch("http://localhost:5001/storageItems?storage_id=" + tempStorages[si]["uid"]);
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            const data = await response.json();
                            setStorageItems(data.storageItems);
                        } catch (err) {
                            setError(err.message);
                        } finally {
                            setLoading(false);
                        }
                    } else {
                        tempStorages[si].selected = false;
                    }
                }
            }
            setStorages((tempStorages) => tempStorages.filter((storage) => storage.uid !== storageId));
        } catch (error) {
            console.error("Error deleting storage:", error);
            setError(error.message);
        }
    };

    async function SwitchItemStorage(storage_id) {
        try {
            const response = await fetch(
                "http://localhost:5001/updateStorageItemStorage?storage_id=" + storage_id + "&item_id=" + isModalOpen.item_id
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // const data = await response.json();
            RefreshStorageItems();
            setIsModalOpen({ open: false, item_id: null });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchStorageItemsOnSelect(storage_id) {
        try {
            const response = await fetch("http://localhost:5001/storageItems?storage_id=" + storage_id);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            var tempStorages = storages;
            for (var si = 0; si < tempStorages.length; si++) {
                if (tempStorages[si].uid === storage_id) {
                    tempStorages[si].selected = true;
                } else {
                    tempStorages[si].selected = false;
                }
            }
            setSelectedStorage(storage_id);
            setStorages(tempStorages);
            setStorageItems(data.storageItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function RefreshStorageItems() {
        try {
            const response = await fetch("http://localhost:5001/storageItems?storage_id=" + selectedStorage);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setStorageItems(data.storageItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const filterStorageItems = storageItems.filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    const filterStorages = storages.filter((storage) => storage.storageName.toLowerCase().includes(searchTerm.toLowerCase()));

    function isSelectedStorage(storage_id) {
        for (var si = 0; si < storages.length; si++) {
            if (storages[si].uid === storage_id) {
                if (storages[si].selected) {
                    return "selected";
                }
            }
        }
        return "";
    }

    return (
        <div className={styles.StoreHouseParts}>
            {isModalOpen.open && (
                <div class='modal-holder'>
                    <div id='myModal' class='modal' onClick={(e) => e.stopPropagation()}>
                        <div class='modal-content'>
                            <span class='close' onClick={(e) => setIsModalOpen({ open: false, item_id: null })} id='closeModalBtn'>
                                &times;
                            </span>
                            <h2 style={{ color: "white", textAlign: "center" }}>Премести артикул в:</h2>
                            {storages.map((storage, index) => (
                                <span class='content' onClick={(e) => SwitchItemStorage(storage.uid)}>
                                    {storage.storageName}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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

            <div class='left-menu'>
                <div class='left-menu-storeHouse'>
                    <span
                        className={`content ${isSelectedStorage(-1)}`}
                        onClick={(e) => {
                            fetchStorageItemsOnSelect(-1);
                        }}
                    >
                        Неразпределени
                    </span>
                    {storages.map((storage, index) => (
                        <span class='content' className={`content ${isSelectedStorage(storage.uid)}`}>
                            <span
                                style={{ width: "80%", float: "left" }}
                                onClick={(e) => {
                                    fetchStorageItemsOnSelect(storage.uid);
                                }}
                            >
                                {storage.storageName}
                            </span>
                            <i
                                className='icon-trash'
                                onClick={() => handleDeleteStorage(storage.uid)}
                                style={{
                                    cursor: "pointer",
                                    color: "red",
                                    float: "right",
                                    marginTop: "10px",
                                    marginRight: "20px",
                                }}
                            ></i>
                        </span>
                    ))}
                </div>
                <Link to='/storeHouse'>
                    <span class='content-default-1'>Добави Склад</span>
                </Link>
            </div>

            <div class='invoices-main-content'>
                <div class='main-content-header'>
                    {filterStorages
                        .filter((storage) => storage.uid === selectedStorage)
                        .map((storage, index) => (
                            <div key={index} className='header-Name' style={{ fontSize: "16px", marginTop: "7px" }}>
                                Склад - {storage.storageName}
                            </div>
                        ))}

                    <Link to={`/Add-items`}>
                        {" "}
                        <div style={{ width: "10%", marginRight: "25px" }} class='button-Add'>
                            <i class='icon-add'></i>
                            Добавяне
                        </div>
                    </Link>
                    <div class='search-holder'>
                        <i class='icon-search'></i>
                        <input
                            type='text'
                            placeholder='Търсене'
                            name='defaultInput'
                            id='defaultInput'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div class='invoices-table'>
                    <table>
                        <thead>
                            <tr>
                                <th width='5%'>#</th>
                                <th width='10%'>Арт. номер</th>
                                <th width='20%'>Име на компонент</th>
                                <th width='10%'>Наличност</th>
                                <th>Складов тип</th>
                                <th>Тип</th>
                                <th>Позиция</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody class='invoices-th'>
                            {filterStorageItems.map((storage, index) => (
                                <tr>
                                    <td width='5%'>{index + 1}</td>
                                    <td width='10%'>{storage.itemNum}</td>
                                    <td width='20%'>{storage.itemName}</td>
                                    <td width='10%'>{storage.Availability}</td>
                                    <td>
                                        {storage.storageType === 0 ? (
                                            <span>Реален</span>
                                        ) : storage.storageType === 1 ? (
                                            <span>Виртуален</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>
                                    <td>
                                        {storage.type === 0 ? (
                                            <span>Производство</span>
                                        ) : storage.type === 1 ? (
                                            <span>Части</span>
                                        ) : (
                                            <h1>Unknown Status</h1>
                                        )}
                                    </td>
                                    <td>{storage.position}</td>

                                    <td class='icons'>
                                        <i class='icon-pen' onClick={() => setIsModalOpen({ open: true, item_id: storage.uid })}></i>

                                        <Link to={``}>
                                            <i class='icon-print'></i>
                                        </Link>
                                        <i class='icon-bag'></i>
                                        <i
                                            class='icon-trash'
                                            onClick={() => handleDelete(storage.uid)}
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                            }}
                                        >
                                            {" "}
                                        </i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='6' style={{ textAlign: "left" }}>
                                    <span>Общо фактури: </span>
                                </td>
                                <td colSpan='2'>
                                    <span>Тотал: лв.</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

StoreHouseParts.propTypes = {};

StoreHouseParts.defaultProps = {};

export default StoreHouseParts;
