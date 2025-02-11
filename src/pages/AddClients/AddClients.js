import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, Link } from "react-router-dom";
import styles from "./AddClients.module.css";

const AddClients = () => {
    const [firmName, setFirmName] = useState("");
    const [clientName, setClientName] = useState("");
    const [mol, setMol] = useState("");
    const [eik, setEik] = useState(0);
    const [dds, setDds] = useState(0);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [clientType, setClientType] = useState(0);

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5001/addClients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clients: {
                        firmName: firmName,
                        clientName: clientName,
                        mol: mol,
                        eik: eik,
                        dds: dds,
                        address: address,
                        city: city,
                        country: country,
                        email: email,
                        phone: phone,
                        clientType: clientType,
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

    return (
        <div className={styles.AddClients}>
            <div className='add-clients-header'>
                <span>Добавяне на клиент</span>
            </div>

            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <span className='add-input-name'>Основна информация</span>
                    <select className='col-1' style={{ marginLeft: "30px", height: "45px" }} id='type' name='type' value={clientType} onChange={(e) => setClientType(e.target.value)}>
                        <option value='0'>Частно лице</option>
                        <option value='1'>Фирма</option>
                    </select>
                    <input className='col-10' type='text' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                </div>
            </div>

            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <input className='col-3' type='text' value={mol} onChange={(e) => setMol(e.target.value)} />
                    <input className='col-3' type='text' value={eik} onChange={(e) => setEik(e.target.value)} />
                    <input className='col-3' type='text' value={dds} onChange={(e) => setDds(e.target.value)} />
                </div>
            </div>
            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <span className='add-input-name'>Местоположение</span>
                    <input className='col-8' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input className='col-2' type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                    <input className='col-11' type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
            </div>

            <div className='add-input-holder'>
                <div className='add-input-row'>
                    <span className='add-input-name'>Допълнителна информация</span>
                    <input className='col-3' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='col-3' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>

            <div className='add-input-btns'>
                <div className='add-input-add' onClick={handleClick}>
                    <span>Запис</span>
                </div>
                <Link to={`/clients`}>
                    {" "}
                    <div className='add-input-cancel'>
                        <span>Отказ</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

AddClients.propTypes = {};

AddClients.defaultProps = {};

export default AddClients;
