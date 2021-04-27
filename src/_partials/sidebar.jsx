import React  from "react";
// import Context from "../context/Context"; 
 import {Link} from "react-router-dom"
const Sidebar = () => {
  // const { sideBarState, menuClick } = useContext(Context);
  // const openViewPage = (e) => {
  //   menuClick(e.target.innerText);
  // };
  return (
    <div id="layoutSidenav_nav">
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Search </div>
                 
                <Link to="/" className="nav-link" >    Stamp Search Engine </Link> 
                 
                 
                <div className="sb-sidenav-menu-heading">Admin Panel</div>
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                  Stamps
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav"> 
                        <Link to="/addstamps" className="nav-link" >Add New Stamp </Link>
                        <Link to="/addstampstwo" className="nav-link" >All  New Stamp 2 </Link> 
                        <Link to="/allstamps" className="nav-link" >All Stamps </Link>

                    </nav>
                </div>
                 
                <div className="sb-sidenav-menu-heading">Setting </div>
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#setting" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                  Authentication
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="setting" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                    <Link to="/login" className="nav-link" >Login </Link>
                    <Link to="/registration" className="nav-link" >Registration </Link> 
                         
                    </nav>
                </div>
                
             </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as: Administator</div> 
        </div>
    </nav>
</div>

  );
};
export default Sidebar;
