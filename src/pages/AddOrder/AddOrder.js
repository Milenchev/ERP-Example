import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddOrder.module.css";
import { Outlet, Link } from "react-router-dom";
import Orders from "../Orders/Orders";

const AddOrder = () => {
    const [client, setClient] = useState("");
    const [dateApplied, setDateApplied] = useState(0);
    const [orderAdded, setOrderAdded] = useState([{ id: 1, client: "", dateApplied: 0 }]);
    const [itemAdded, setItemAdded] = useState([{ id: 1, productName: "", unit: 0, quantity: 0, price: 0 }]);

    const [items, setItems] = useState([]); // State to store API data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/getAllStorageItems");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setItems(data.storageItems); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const filterStorageItems = items.filter((item) => String(item.itemNum).toLowerCase().includes(searchTerm.toLowerCase()));

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5001/addOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orders: {
                        client: client,
                        dateApplied: dateApplied,
                        orderItems: itemAdded,
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
        let updatedItem = itemAdded.map((item) => (item.id === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === itemAdded.length - 1 && e.target.value !== "") {
            updatedItem = [
                ...updatedItem,
                {
                    id: itemAdded.length + 1,
                    productName: "",
                    unit: 0,
                    quantity: 0,
                    price: 0,
                    productOrderId: 0,
                },
            ];
        }

        setItemAdded(updatedItem);
    };

    return (
        <div className={styles.AddOrder}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на поръчка</span>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-6 input-row'>
                            <span>Клиент</span>
                            <input
                                style={{ float: "left", width: "90%", height: "30px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                            />
                        </div>

                        <div className='col-6  input-row'>
                            <span style={{ marginLeft: "40px" }}>Дата на поръчка</span>
                            <input
                                style={{ float: "left", marginLeft: "40px", width: "90%", height: "30px" }}
                                className='input-label'
                                type='date'
                                placeholder=''
                                name='defaultInput'
                                value={dateApplied}
                                onChange={(e) => setDateApplied(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th width='3%'>№</th>
                            <th width='50%'>Описание на стока/услуга</th>
                            <th width='10%'>Мярка</th>
                            <th width='10%'>К-во</th>
                            <th width='10%'>Ед. цена</th>

                            <th width='10%'>Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemAdded.map((item, index) => (
                            <tr>
                                <td width='3%'>{item.id}</td>
                                <td width='20%'>
                                    {" "}
                                    <select
                                        class='width-90'
                                        type='text'
                                        name='itemName'
                                        value={item.productName}
                                        onChange={(e) => handleInputChange(item.id, e, index, "productName")}
                                        style={{ width: "100%", height: "30px" }}
                                    >
                                        <option value=''>Изберете продукт</option>
                                        {filterStorageItems.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.itemName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select id='unit' name='unit'>
                                        <option value='unit'></option>
                                    </select>
                                </td>

                                <td>
                                    <input type='number' name='quantity'></input>
                                </td>

                                <td>
                                    <input type='text' name='price' />{" "}
                                </td>

                                <td>лв.</td>
                            </tr>
                        ))}
                        <tr>
                            <td className='bold-left ' colSpan='3'></td>
                            <td className='bold-right' colSpan='2'>
                                Субтотал
                            </td>
                            <td></td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='1'>
                                ДДС 20%
                            </td>
                            <td></td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='1'>
                                Общо с ДДС
                            </td>
                            <td>лв.</td>
                        </tr>
                    </tbody>
                </table>

                <div className='footer'>
                    <div className='btn-add' onClick={handleClick}>
                        <span>Добавяне</span>
                    </div>

                    <Link to='/Orders'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AddOrder.propTypes = {};

AddOrder.defaultProps = {};

export default AddOrder;
