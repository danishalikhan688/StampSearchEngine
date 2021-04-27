import React, { useContext } from 'react'
import Index from './components/pages/index/index';
import Context from "./context/Context";
import Footer from './_partials/footer';
import Navbar from './_partials/navbar';
import Sidebar from './_partials/sidebar';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AddStamps from './components/pages/addstamps/addstamps';
import Login from './components/auth/auth';
import Registration from './components/auth/registration';
import AllStamps from './components/pages/allstamps/allstamps';
import AddStamptwo from './components/pages/addstamps/addstampstwo';

function App() {
  const { addSideBarClass } = useContext(Context);
  return (

    <Router>
      <Switch>
      <Route exact path="/login" children={<Login/>} />
      <Route exact path="/registration" children={<Registration/>} />
        <div className={addSideBarClass ? "sb-nav-fixed " : "sb-nav-fixed sb-sidenav-toggled"}  >
          <Navbar />
          <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
              <main>
                <Route exact path="/" children={<Index />} />
                <Route exact path="/addstamps" children={<AddStamps />} />
                <Route exact path="/addstampstwo" children={<AddStamptwo />} />
                <Route exact path="/allstamps" children={<AllStamps />} />

              </main>
              <Footer />
            </div>
          </div>
        </div>
      </Switch>
    </Router>

  );
}

export default App;
