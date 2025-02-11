import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Layout = () => {
    const [activeLink, setActiveLink] = useState(null);

    const handleClick = (e) => {
        const parentElement = e.target.closest("span");
        if (parentElement) {
            setActiveLink(parentElement);
        }
    };

    return (
        <>
            <div className='nav'>
                <div className='menu'>
                    <span onClick={handleClick} className={activeLink && activeLink.textContent === "НАЧАЛО" ? "clicked" : ""}>
                        <Link to='/'>НАЧАЛО</Link>
                    </span>

                    <span onClick={handleClick} className={activeLink && activeLink.textContent === "ДОКУМЕНТИ" ? "clicked" : ""}>
                        <Link to='/Documents'>ДОКУМЕНТИ</Link>
                    </span>

                    <span onClick={handleClick} className={activeLink && activeLink.textContent === "КЛИЕНТИ" ? "clicked" : ""}>
                        <Link to='/clients'>КЛИЕНТИ</Link>
                    </span>
                    <span onClick={handleClick} className={activeLink && activeLink.textContent === "КЛИЕНТИ" ? "clicked" : ""}>
                        <Link to='/storeHouseParts'>СКЛАД</Link>
                    </span>
                </div>

                <div class='menu-profile'>
                    <i class='icon bell'></i>
                    <i class='icon icon-profile'></i>
                    <div class='profile'>
                        <i class='photo'></i>
                        <span>Тодор Тодоров</span>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    );
};

export default Layout;
