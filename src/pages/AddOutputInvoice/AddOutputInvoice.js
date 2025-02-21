import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddOutputInvoice.module.css";
import { Outlet, Link } from "react-router-dom";

const AddOutputInvoice = () => {
    const [invoiceNum, setInvoiceNum] = useState("3000000001");
    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState(0);
    const [owner, setOwner] = useState("");
    const [typeDoc, setTypeDoc] = useState("0");
    const [faxDate, setFaxDate] = useState("");
    const [paymentType, setPaymentType] = useState("0");
    const [responseProducts, setResponseProducts] = useState([]);
    const [products, setProducts] = useState([{ id: 1, name: "", unit: "бр.", quantity: 0, price: 0, discount: 0 }]);

    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentDate, setCurrentDate] = useState(new Date());

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

        GetMaximumInvoiceNum();
        fetchData();
    }, []); // Runs once when the component mounts

    // const [searchTerm, setSearchTerm] = useState("");

    // const filterClients = client.filter((client) => client.clientName.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleClick = async () => {
        try {
            var invoiceTotalValue = products
                .reduce(
                    (acc, invoice) =>
                        acc +
                        invoice.quantity * invoice.price * (1 - invoice.discount / 100) +
                        invoice.quantity * invoice.price * (1 - invoice.discount / 100) * 0.2,
                    0
                )
                .toFixed(2);
            const response = await fetch("http://localhost:5001/addOutgoingInvoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoice: {
                        invoiceNum: invoiceNum,
                        client: clientName,
                        clientId: clientId,
                        ownerName: owner,
                        type: typeDoc,
                        date: currentDate.toLocaleDateString(),
                        typeOfPayment: paymentType,
                        total_value: invoiceTotalValue,
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

    const handleInputChange = (id, e, index, key) => {
        // Update the product details
        let updatedProducts = products.map((item) => (item.id === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === products.length - 1 && e.target.value !== "") {
            updatedProducts = [
                ...updatedProducts,
                {
                    id: products.length + 1,
                    name: "",
                    unit: "бр.",
                    quantity: 0,
                    price: 0,
                    discount: 0,
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
                setOwner(clients[ci].mol);
                break;
            }
        }
    };

    const GetMaximumInvoiceNum = async () => {
        try {
            const response = await fetch("http://localhost:5001/getLastInvoiceNum?invoice_type=" + typeDoc);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data["invoice_num"] == "none") {
                if (typeDoc == 0) {
                    setInvoiceNum("3000000001");
                } else {
                    setInvoiceNum("2000000001");
                }
            } else {
                setInvoiceNum(parseInt(data["invoice_num"]) + 1);
            }
            // setClients(data.clients); // Store fetched data in state
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeDoc) {
            GetMaximumInvoiceNum();
        }
    }, [typeDoc]);

    return (
        <div className={styles.AddOutputInvoice}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на изходна фактура (3000001618)</span>
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
                            <input
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />
                        </div>

                        <div className='col-2 input-row'>
                            <span>Тип на документа</span>
                            <select id='type' name='type' value={typeDoc} onChange={(e) => setTypeDoc(e.target.value)}>
                                <option value='0'>Фактура</option>
                                <option value='1'>Проформа фактура</option>
                            </select>
                        </div>

                        <div className='col-2 input-row'>
                            <span>Фактура номер</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' disabled value={invoiceNum} />
                        </div>

                        <div className='col-2 input-row'>
                            <span>Дата на фактура</span>
                            <input
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
                                disabled
                                value={currentDate.toLocaleDateString()}
                                // onChange={(e) => setFaxDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <div className='col-3 input-row'>
                            <span>Начин на плащане</span>
                            <select id='fruits' name='fruits' value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
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
                            <th width='10%'>Т.О.(%)</th>
                            <th width='10%'>Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((invoice, index) => (
                            <tr key={invoice.id}>
                                <td width='3%'>{invoice.id}</td>
                                <td width='20%'>
                                    {" "}
                                    <input
                                        class='width-90'
                                        type='text'
                                        id={`name-${index}`}
                                        name='name'
                                        value={invoice.name}
                                        onChange={(e) => handleInputChange(invoice.id, e, index, "name")}
                                    />
                                </td>
                                <td>
                                    <select id='unit' name='unit'>
                                        <option value='unit'>{invoice.unit}</option>
                                    </select>
                                </td>

                                <td>
                                    <input
                                        type='number'
                                        d={`quantity-${index}`}
                                        name='quantity'
                                        value={invoice.quantity}
                                        onChange={(e) => handleInputChange(invoice.id, e, index, "quantity")}
                                    ></input>
                                </td>

                                <td>
                                    <input
                                        type='text'
                                        id={`name-${index}`}
                                        name='price'
                                        value={invoice.price}
                                        onChange={(e) => handleInputChange(invoice.id, e, index, "price")}
                                    />{" "}
                                </td>

                                <td>
                                    <input
                                        type='text'
                                        style={{ width: "60%" }}
                                        id={`discount-${index}`}
                                        name='discount'
                                        value={invoice.discount}
                                        onChange={(e) => handleInputChange(invoice.id, e, index, "discount")}
                                    />{" "}
                                </td>
                                <td>{(invoice.price * invoice.quantity).toFixed(2)} лв.</td>
                            </tr>
                        ))}

                        <tr>
                            <td className='bold-left ' colSpan='4'></td>
                            <td className='bold-right' colSpan='2'>
                                Субтотал
                            </td>
                            <td>
                                {" "}
                                {products
                                    .reduce((acc, invoice) => acc + invoice.quantity * invoice.price * (1 - invoice.discount / 100), 0)
                                    .toFixed(2)}{" "}
                                лв.
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='2'>
                                ДДС 20%
                            </td>
                            <td>
                                {products
                                    .reduce((acc, invoice) => acc + invoice.quantity * invoice.price * (1 - invoice.discount / 100) * 0.2, 0)
                                    .toFixed(2)}{" "}
                                лв.
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='4'></td>
                            <td className='bold-right' colSpan='2'>
                                Общо с ДДС
                            </td>
                            <td>
                                {products
                                    .reduce(
                                        (acc, invoice) =>
                                            acc +
                                            invoice.quantity * invoice.price * (1 - invoice.discount / 100) +
                                            invoice.quantity * invoice.price * (1 - invoice.discount / 100) * 0.2,
                                        0
                                    )
                                    .toFixed(2)}{" "}
                                лв.
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='footer'>
                    <div className='btn-add' onClick={handleClick}>
                        <span>Добавяне</span>
                    </div>
                    <div className='btn-addAndPrint'>
                        <span>Добавяне и печат</span>
                    </div>
                    <Link to='/Documents'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AddOutputInvoice.propTypes = {};

AddOutputInvoice.defaultProps = {};

export default AddOutputInvoice;
