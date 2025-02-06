import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="nav">

        <div class="menu">
          <span class="blue"><Link to="/">НАЧАЛО</Link></span>
          <span><Link to="/Documents">ДОКУМЕНТИ</Link> </span>
          <span><Link to="/contact" >КОНТРАГЕНТИ</Link></span>
        </div>

        <div class="menu-profile">
          <i class="icon bell"></i>
          <i class="icon icon-profile"></i>
          <div class="profile">
              <i class="photo"></i>
              <span>Тодор Тодоров</span>
              
          </div>
        </div>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;