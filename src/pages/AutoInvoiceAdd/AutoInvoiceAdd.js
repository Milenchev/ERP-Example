import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AutoInvoiceAdd.module.css";
import { Outlet, Link } from "react-router-dom";

const AutoInvoiceAdd = () => {
    const [client, setClientName] = useState(1);
    const [clientId, setClientId] = useState(0);
    const [dateOfMonth, setDateOfMonth] = useState(0);
    const [price, setPrice] = useState(0);
    const [typeOfPayment, setTypeOfPayment] = useState(0);
    const [unpaid, setUnpaid] = useState(0);
    const [products, setProducts] = useState([{ id: 1, productName: "", unit: "бр.", quantity: 0, price: 0 }]);

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5001/addAutomaticInvoicesProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    automaticInvoice: {
                        client: client,
                        clientId: clientId,
                        dateOfMonth: dateOfMonth,
                        price: price,
                        typeOfPayment: typeOfPayment,
                        unpaid: unpaid,
                        products: products,
                    },
                }), // Send your data here
            });

            const result = await response.json();
            console.log(result); // Handle response as needed
            window.history.go(-1);
        } catch (error) {
            console.error("Error:", error); // Handle errors
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/clients");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setClients(data.clients); // Store fetched data in state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    const handleInputChange = (id, e, index, key) => {
        let updatedProducts = products.map((item) => (item.id === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === products.length - 1 && e.target.value !== "") {
            updatedProducts = [
                ...updatedProducts,
                {
                    id: products.length + 1,
                    productId: 0,
                    productName: "",
                    unit: "бр",
                    quantity: 0,
                    price: 0,
                },
            ];
        }

        setProducts(updatedProducts);
    };

    const SetClient = (client_name) => {
        setClientName(client_name);
        setSelectedClient(client_name);
        for (var ci = 0; ci < clients.length; ci++) {
            if (clients[ci].clientName == client_name) {
                setClientId(clients[ci].uid);
                break;
            }
        }
    };

    return (
        <div className={styles.AutoInvoiceAdd}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на автоматична фактура</span>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-3 input-row'>
                            <span>Клиент</span>
                            <select
                                class='width-90'
                                type='text'
                                name='itemName'
                                value={selectedClient}
                                onChange={(e) => SetClient(e.target.value)}
                                style={{ width: "90%", height: "30px" }}
                            >
                                <option value=''>Изберете клиент</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.clientName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-3 input-row'>
                            <span>МОЛ</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' />
                        </div>

                        <div className='col-3 input-row'>
                            <span>Месечна дата на автоматицация</span>
                            <select id='type' name='type'>
                                <option value='0'>1-ви</option>
                                <option value='1'>2-ри</option>
                                <option value='2'>3-ри</option>
                                <option value='3'>10-ти</option>
                                <option value='4'>15-ри</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-3 input-row'>
                            <span>Срок на плащане</span>
                            <select id='expDate' name='expDate'>
                                <option value='0'>5 дни</option>
                                <option value='1'>10 дни</option>
                                <option value='2'>15 дни</option>
                            </select>
                        </div>

                        <div className='col-3 input-row'>
                            <span>Начин на плащане</span>
                            <select id='typeOfPayment' name='typeOfPayment'>
                                <option value='0'>Банков превод</option>
                                <option value='1'>В брой</option>
                                <option value='2'>Пощенски паричен</option>
                            </select>
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
                        {products.map((autoInvoice, index) => (
                            <tr key={autoInvoice.id}>
                                <td width='3%'>{autoInvoice.id}</td>
                                <td width='20%'>
                                    {" "}
                                    <input
                                        class='width-90'
                                        type='text'
                                        name='name'
                                        value={autoInvoice.productName}
                                        onChange={(e) => handleInputChange(autoInvoice.id, e, index, "productName")}
                                    />
                                </td>
                                <td>
                                    <select id='unit' name='unit'>
                                        <option value='unit'>{autoInvoice.unit}</option>
                                    </select>
                                </td>

                                <td>
                                    <input
                                        type='number'
                                        name='quantity'
                                        value={autoInvoice.quantity}
                                        onChange={(e) => handleInputChange(autoInvoice.id, e, index, "quantity")}
                                    ></input>
                                </td>

                                <td>
                                    <input
                                        type='text'
                                        name='price'
                                        value={autoInvoice.price}
                                        onChange={(e) => handleInputChange(autoInvoice.id, e, index, "price")}
                                    />{" "}
                                </td>

                                <td>лв.</td>
                            </tr>
                        ))}
                        <tr>
                            <td className='bold-left ' colSpan='4'></td>
                            <td className='bold-right' colSpan='1'>
                                Субтотал
                            </td>
                            <td>лв.</td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='1'>
                                ДДС 20%
                            </td>
                            <td>лв.</td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='1 '>
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
                    <Link to='/auto-invoices'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AutoInvoiceAdd.propTypes = {};

AutoInvoiceAdd.defaultProps = {};

export default AutoInvoiceAdd;
