import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AddOrder.module.css";
import { Outlet, Link } from "react-router-dom";

const AddOrder = () => {
    return (
        <div className={styles.AddOrder}>
            <div className='add-fax-holder'>
                <div className='add-fax-header'>
                    <span>Добавяне на изходна фактура (3000001618)</span>
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
                            />
                        </div>

                        <div className='col-6  input-row'>
                            <span style={{ marginLeft: "40px" }}>Дата на поръчка</span>
                            <input
                                style={{ float: "left", marginLeft: "40px", width: "90%", height: "30px" }}
                                className='input-label'
                                type='text'
                                placeholder=''
                                name='defaultInput'
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
                        <tr>
                            <td width='3%'></td>
                            <td width='20%'>
                                {" "}
                                <input class='width-90' type='text' name='name' />
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
                    <div className='btn-add'>
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
