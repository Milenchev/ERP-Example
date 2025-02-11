import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./PrintOffer.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const PrintOffer = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searchParams] = useSearchParams();
    const [responseProducts, setResponseProducts] = useState([]);
    const offerId = searchParams.get("offer_id");
    const [offerInfo, setOfferInfo] = useState({});
    const [totalValue, setTotalValue] = useState(0);

    const paddedOfferId = offerId ? offerId.padStart(10, "0") : "";
    var print_once = false;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/offers");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                for (var i = 0; i < data.offers.length; i++) {
                    if (data.offers[i].uid == offerId) {
                        setOfferInfo(data.offers[i]);
                        const response_products = await fetch("http://localhost:5001/offerProducts?offerId=" + data.offers[i]["uid"]);
                        if (response_products.ok) {
                            const data_products = await response_products.json();
                            var total_value = 0;
                            for (var di = 0; di < data_products.offerProducts.length; di++) {
                                total_value += data_products.offerProducts[di].quantity * data_products.offerProducts[di].price;
                            }
                            setTotalValue(total_value);
                            setResponseProducts(data_products.offerProducts);
                            setTimeout(() => {
                                if (!print_once) {
                                    window.print();
                                    window.history.go(-1);
                                    print_once = true;
                                }
                            }, 500);
                        }
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [offerId]); // Runs once when the component mounts

    return (
        <div className={styles.PrintOffer}>
            <div className='print-offers-header'></div>
            <span className='offer'>ОФЕРТА</span>
            <div className='print-offers-content'>
                <div className='print-offers-row'>
                    <div className='row'>
                        <span className='row-offer'>Аксион Солюшънс ЕООД:</span>
                        <span className='row-offer-1'>ул.Георги Данчов 18</span>
                        <span className='row-offer-2'>Пловдив 4023, България</span>
                        <span className='row-offer-3'>0700 112 67</span>
                        <span className='row-offer-4'>office@axion.solutions</span>
                        <span className='row-offer-4'>www.axion.solutions</span>
                    </div>
                </div>
            </div>

            <div className='print-offers-content'>
                <div className='print-offers-row-2'>
                    <div className='row'>
                        <span style={{ fontSize: "14px" }} className='row-offer'>
                            До
                        </span>
                        <span style={{ fontSize: "14px" }} className='row-offer-1'>
                            Даикс 00Д
                        </span>
                        <span style={{ fontSize: "14px" }} className='row-offer-2'>
                            Георги Георгиев
                        </span>
                    </div>
                </div>
            </div>

            <table className='fax-table'>
                <thead>
                    <tr>
                        <th width='3%'>№</th>
                        <th width='30%'>Описание</th>
                        <th width='10%'>Мярка</th>
                        <th width='10%'>К-во</th>
                        <th width='10%'>Ед. цена</th>
                        <th width='10%'>Общо</th>
                    </tr>
                </thead>
                <tbody>
                    {responseProducts.map((offer, index) => (
                        <tr>
                            <td width='3%'>{index}</td>
                            <td className='bold' width='20%'>
                                {offer.productName}
                            </td>
                            <td>{offer.unit}</td>
                            <td>{offer.quantity}</td>
                            <td>{offer.price}</td>
                            <td></td>
                        </tr>
                    ))}
                    <tr>
                        <td className='bold-left ' colSpan='5'></td>
                        <td> лв.</td>
                    </tr>
                </tbody>
            </table>

            <div className='autograph'>
                <div className='autograph-name'>
                    <span>Изготвил</span>
                </div>
                <div className='autograph-sign'></div>
            </div>

            <div className='sum-offers-content'>
                <div className='sum-offers-row'>
                    <div className='row'>
                        <span
                            style={{
                                fontSize: "15px",
                                backgroundColor: "black",
                                color: "white",
                                textAlign: "center",
                            }}
                            className='row-offer'
                        >
                            1200лв.
                        </span>
                        <span
                            style={{
                                fontSize: "15px",
                                backgroundColor: "white",
                                color: "black",
                                textAlign: "center",
                            }}
                            className='row-offer-1'
                        >
                            1400лв
                        </span>
                        <span
                            style={{
                                fontSize: "15px",
                                backgroundColor: "blue",
                                color: "white",
                                textAlign: "center",
                            }}
                            className='row-offer-2'
                        >
                            2020лв.
                        </span>
                    </div>
                </div>
            </div>

            <div className='sum-offers-content'>
                <div className='sum-offers-row'>
                    <div className='row'>
                        <span style={{ fontSize: "14px" }} className='row-offer'>
                            Общо
                        </span>
                        <span style={{ fontSize: "14px", marginTop: "5px" }} className='row-offer-1'>
                            ДДС 20%
                        </span>
                        <span style={{ fontSize: "14px", marginTop: "5px" }} className='row-offer-2'>
                            ВСИЧКО С ДДС
                        </span>
                    </div>
                </div>
            </div>

            <div className='offer-footer'>
                <span
                    style={{
                        fontWeight: "Bold",
                        fontSize: "14px",
                        marginTop: "10px",
                    }}
                >
                    Забележка:
                </span>
                <span style={{ marginTop: "5px" }}>1. Валидност на офертата 30 дни</span>
                <span style={{ marginTop: "5px" }}>2. Доставка на оборудването до 2 седмици</span>
            </div>
        </div>
    );
};

PrintOffer.propTypes = {};

PrintOffer.defaultProps = {};

export default PrintOffer;
