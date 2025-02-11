import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddIncomingInvoice.module.css";
import { Outlet, Link } from "react-router-dom";

const AddOutputInvoice = () => {
    const [supplier, setSupplier] = useState("");
    const [typeDoc, setTypeDoc] = useState("0");
    const [faxNum, setFaxNum] = useState("");
    const [invoiceTotalValue, setInvoiceTotalValue] = useState(0);
    const [faxDate, setFaxDate] = useState("");
    const [paymentType, setPaymentType] = useState("0");
    const [responseProducts, setResponseProducts] = useState([]);
    const [products, setProducts] = useState([{ id: 1, name: "", unit: "бр.", quantity: 0, price: 0, discount: 0 }]);

    const handleClick = async () => {
        try {
            var invoiceTotalValue = products
                .reduce((acc, invoice) => acc + invoice.quantity * invoice.price * (1 - invoice.discount / 100) + invoice.quantity * invoice.price * (1 - invoice.discount / 100) * 0.2, 0)
                .toFixed(2);
            let date_split = faxDate.split(".");
            let exp_date = new Date(date_split[1] + "." + date_split[0] + "." + date_split[2]);
            exp_date.setDate(exp_date.getDate() + 15);
            let exp_date_format = exp_date.getDate() + "." + (exp_date.getMonth() + 1) + "." + exp_date.getFullYear();
            const response = await fetch("http://localhost:5001/addIncomingInvoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoice: {
                        supplierName: supplier,
                        expDate: exp_date_format,
                        type: typeDoc,
                        fax: faxNum,
                        date: faxDate,
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

    return (
        <div className={styles.AddOutputInvoice}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на входна фактура</span>
                </div>

                <div className='input-holder'>
                    <div className='row'>
                        <span style={{ marginBottom: "15px", fontWeight: "Bold" }}>Основна информация</span>
                        <div className='col-3 input-row'>
                            <span>Доставчик</span>
                            <input style={{ width: "80%" }} className='input-label' type='text' placeholder='' name='defaultInput' value={supplier} onChange={(e) => setSupplier(e.target.value)} />
                        </div>

                        <div className='col-2 input-row'>
                            <span>Фактура номер</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' value={faxNum} onChange={(e) => setFaxNum(e.target.value)} />
                        </div>

                        <div style={{ marginLeft: "60px" }} className='col-2 input-row'>
                            <span>Дата на фактура</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' value={faxDate} onChange={(e) => setFaxDate(e.target.value)} />
                        </div>

                        <div style={{ marginLeft: "60px" }} className='col-3 input-row'>
                            <span>Коментар</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' />
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
                                Детайли за плащане
                            </span>
                            <span>Срок за плащане</span>
                            <select id='expDate' name='expDate'>
                                <option>15 дни</option>
                            </select>
                        </div>

                        <div className='col-2 input-row' style={{ marginTop: "48px", marginLeft: "120px" }}>
                            <span>Начин на плащане</span>
                            <select id='fruits' name='fruits' value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                <option value='0'>Банков превод</option>
                                <option value='1'>В брой</option>
                                <option value='2'>Пощенски паричен</option>
                            </select>
                        </div>

                        <div className='col-2 input-row' style={{ marginTop: "48px", marginLeft: "60px" }}>
                            <span>Сума за плащане (С ДДС)</span>
                            <input className='input-label' type='text' placeholder='' name='defaultInput' value={invoiceTotalValue} onChange={(e) => setInvoiceTotalValue(e.target.value)} />
                        </div>

                        <div className='col-2 input-row' style={{ marginTop: "48px", marginLeft: "57px" }}>
                            <span>Валута</span>
                            <select id='fruits' name='fruits'>
                                <option>Лв.</option>
                                <option>$</option>
                                <option>Евро</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div className='btn-add' onClick={handleClick}>
                        <span>Добавяне</span>
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

AddOutputInvoice.propTypes = {};

AddOutputInvoice.defaultProps = {};

export default AddOutputInvoice;
