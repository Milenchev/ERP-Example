import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddOffer.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const AddOffer = () => {
    const [clientName, setClientName] = useState("");
    const [mol, setMol] = useState("");
    const [typeOfOffer, setTypeOfOffer] = useState(0);
    const [dateOfOffer, setDateOfOffer] = useState(0);
    const [heading, setHeading] = useState("");
    const [price, setPrice] = useState(0);
    const [state, setState] = useState(0);

    const [products, setProducts] = useState([{ offerId: 0, productName: "", unit: "бр.", quantity: 0, price: 0 }]);

    const addOffer = async () => {
        try {
            const response = await fetch("http://localhost:5001/addOffers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    offer: {
                        clientName: clientName,
                        mol: mol,
                        typeOfOffer: typeOfOffer,
                        dateOfOffer: dateOfOffer,
                        heading: heading,
                        price: price,
                        state: state,
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
        let updatedProducts = products.map((item) => (item.offerId === id ? { ...item, [key]: e.target.value } : item));

        // Check if it's the last row and input is not empty
        if (index === products.length - 1 && e.target.value !== "") {
            updatedProducts = [
                ...updatedProducts,
                {
                    offerIdid: products.length + 1,
                    productName: "",
                    unit: "бр.",
                    quantity: 0,
                    price: 0,
                },
            ];
        }

        setProducts(updatedProducts);
    };
    const [showContentA, setShowContentA] = useState(true);

    // Function to toggle content
    const toggleContent = (isContentA) => {
        setShowContentA(isContentA);
    };

    return (
        <div className={styles.AddOffer}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на оферта</span>
                </div>

                <div className='add-offer-menu'>
                    <div className='offer-info'>
                        <span onClick={() => toggleContent(true)}>Основна информация</span>
                        <span onClick={() => toggleContent(false)}>Артикули</span>
                    </div>
                </div>

                {showContentA ? (
                    <div>
                        <div className='input-holder'>
                            <div className='row'>
                                <div className='col-3 input-row'>
                                    <span>Клиент</span>
                                    <input
                                        style={{ width: "80%" }}
                                        className='input-label'
                                        type='text'
                                        placeholder=''
                                        name='defaultInput'
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>

                                <div className='col-3 input-row'>
                                    <span>МОЛ</span>
                                    <input
                                        style={{ width: "80%" }}
                                        className='input-label'
                                        type='text'
                                        placeholder=''
                                        name='defaultInput'
                                        value={mol}
                                        onChange={(e) => setMol(e.target.value)}
                                    />
                                </div>

                                <div className='col-3 input-row'>
                                    <span>Тип на оферта</span>
                                    <select
                                        style={{ width: "80%" }}
                                        id='type'
                                        name='type'
                                        value={typeOfOffer}
                                        onChange={(e) => setTypeOfOffer(e.target.value)}
                                    >
                                        <option value='0'>Проект</option>
                                        <option value='1'>Обект</option>
                                    </select>
                                </div>

                                <div className='col-2 input-row'>
                                    <span>Дата на оферта</span>
                                    <input
                                        style={{ width: "120%" }}
                                        className='input-label'
                                        type='text'
                                        placeholder=''
                                        name='defaultInput'
                                        value={dateOfOffer}
                                        onChange={(e) => setDateOfOffer(e.target.value)}
                                    />
                                </div>

                                <div className='col-2 input-row'>
                                    <span style={{ marginTop: "10px" }}>Заглавие</span>
                                    <input
                                        className='input-label'
                                        type='text'
                                        placeholder=''
                                        name='defaultInput'
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
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
                                {products.map((offer, index) => (
                                    <tr>
                                        <td width='3%'></td>
                                        <td width='20%'>
                                            {" "}
                                            <input
                                                class='width-90'
                                                type='text'
                                                value={offer.productName}
                                                onChange={(e) => handleInputChange(offer.offerId, e, index, "productName")}
                                            />
                                        </td>
                                        <td>
                                            <input value={offer.unit} onChange={(e) => handleInputChange(offer.offerId, e, index, "unit")}></input>
                                        </td>

                                        <td>
                                            <input
                                                type='number'
                                                value={offer.quantity}
                                                onChange={(e) => handleInputChange(offer.offerId, e, index, "quantity")}
                                            ></input>
                                        </td>

                                        <td>
                                            <input
                                                type='text'
                                                value={offer.price}
                                                onChange={(e) => handleInputChange(offer.offerId, e, index, "price")}
                                            />{" "}
                                        </td>
                                        <td>{offer.price} лв.</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className='bold-left ' colSpan='4'></td>
                                    <td className='bold-right' colSpan='1'>
                                        Субтотал
                                    </td>
                                    <td> {products.reduce((acc, offer) => acc + offer.quantity * offer.price, 0).toFixed(2)} лв.</td>
                                </tr>

                                <tr>
                                    <td colSpan='4'></td>
                                    <td className='bold-right' colSpan='1'>
                                        ДДС 20%
                                    </td>
                                    <td>{products.reduce((acc, offer) => acc + offer.quantity * offer.price * 0.2, 0).toFixed(2)} лв.</td>
                                </tr>

                                <tr>
                                    <td colSpan='4'></td>
                                    <td className='bold-right' colSpan='1'>
                                        Общо с ДДС
                                    </td>
                                    <td>
                                        {products
                                            .reduce(
                                                (acc, invoice) => acc + invoice.quantity * invoice.price + invoice.quantity * invoice.price * 0.2,
                                                0
                                            )
                                            .toFixed(2)}{" "}
                                        лв.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <div className='footer'>
                    <div className='btn-add' onClick={addOffer}>
                        <span>Добавяне</span>
                    </div>
                    <Link to='/offers'>
                        <div className='btn-back'>
                            <span>Назад</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

AddOffer.propTypes = {};

AddOffer.defaultProps = {};

export default AddOffer;
