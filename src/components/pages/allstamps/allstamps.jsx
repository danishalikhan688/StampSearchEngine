import Context from '../../../context/Context'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"
import "./assets/allstamps.css"
import { globalVars } from '../../../util/common';
import { useHistory } from "react-router";
import React, { useState, useEffect, useContext } from "react";

const AllStamps = () => {
  const history = useHistory();
  
  useEffect(() => {
    const checkAuth = async () => {

      var response = await fetch(globalVars.urls.baseURL + '/checkAuth')
      var data = await response.json()

      if (data.return === 'not authenticated') {
        history.push('/registration')
      }
    }

    checkAuth()

  }, [])

  const { stamps } = useContext(Context);
  useEffect(() => {
    const allStamps = async () => {

      var response = await fetch(globalVars.urls.baseURL + '/allStamps')
      var data = await response.json()

      const info = data.info
      const images = data.stampImages
      console.log(info)
      console.log(images)
    }

    allStamps()
  }, [])
  
  return (
    <Container fluid>
      <form  >
        <Container fluid >
          <Row className="add-stamp-box ">
            <Col lg={12}>
              <ol className="breadcrumb mb-4 d-flex justify-content-center">
                <h1 className="breadcrumb-item text-center active ">All Stamps</h1>
              </ol>
            </Col>
            {stamps.map((item, index) => (
              <Col key={Math.random()} md={6} lg={6} xl={4} sm={12}>
                <div className="card "    >
                  <div className="card-image-container">
                    <img
                      className="card-image"
                      src={item.image}
                      alt="feature"
                    />
                    <Link
                      onClick={() =>
                        localStorage.setItem("singleStamp", JSON.stringify(item))
                      }
                      to={"/addstamps"}
                    >
                      <span className="badge">{" Edit  "}</span>
                    </Link>
                  </div>
                  <div className="card-text">
                    <span className="date">Year :  {item.year} </span>
                    <h2>{item.title}</h2>
                    <h2>{item.country}</h2>
                    <p>{item.info}</p>
                    <span className="adderss-text mb-4">Stamp Number  :  {item.stampNumber}</span><br />
                    <span className="  ">Catalog Year  :  {item.catalogYear}</span><br />
                    <span className="   ">Price:  {item.price}</span><br />
                    <span className="  ">Scott Number  :  {item.scottNumber}</span><br />
                    <span className="   ">Verien tNumber :  {item.verientNumber}</span><br />
                    <span className="    ">Face Value  :  {item.faceValue}</span>
                  </div>
                  <div className="card-stats">
                    <div className="stat   ">
                      <div className="value">Catalog A Name</div>
                      <div className="type">{item.catalogAName}</div>
                    </div>
                    <div className="stat state-border ">
                      <div className="value">Catalog A Name #</div>
                      <div className="type">{item.catalogANumber}</div>
                    </div>
                  </div>
                </div>

              </Col>
            ))}
          </Row>
        </Container>
      </form>

    </Container>

  );
};
export default AllStamps;