import Context from '../../../context/Context'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"
import "./assets/allstamps.css"
import { globalVars } from '../../../util/common';
import { useHistory } from "react-router";
import React, { useState, useEffect, useContext } from "react";
import Spinner from 'react-bootstrap/Spinner'

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

  const { setEdit, setEditStampData } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [stamps, setStamps] = useState([

    {
      "info": [{ "catalog_name": "s", "catalog_number": "s", "catalog_price": 1, "catalog_scott_number": "s", "catalog_verient_number": "s", "catalog_year": 1900, "image_name": "IMG-20191208-WA0034.jpg", "image_type": "uploadCleanStampImage", "stamp_country": "s", "stamp_face_value": "s", "stamp_info": "s", "stamp_number": "s", "stamp_title": "s", "stamp_year": 1900 },
      { "catalog_name": "j", "catalog_number": "j", "catalog_price": 1, "catalog_scott_number": "j", "catalog_verient_number": "j", "catalog_year": 1900, "image_name": "IMG-20191208-WA0034 (copy).jpg", "image_type": "uploadCancelStampImage", "stamp_country": "j", "stamp_face_value": "j", "stamp_info": "j", "stamp_number": "j", "stamp_title": "j", "stamp_year": 1900 },
      ],
      "stampImages": ["/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQEg", "./assets/img/2.jpg"]
    }
  ])

  useEffect(() => {
    setLoading(true)
    const allStamps = async () => {
      var response = await fetch(globalVars.urls.baseURL + '/allStamps')
      var data = await response.json()
      setStamps(data)
      setLoading(false)
      setShowResult(true)
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
            {loading ? <Col className="mt-5 d-flex justify-content-center align-items-center" key={Math.random()} lg={12}> <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner></Col> :
              showResult ? stamps.info.map((item, index) => (
                <Col className="mt-5" key={Math.random()} md={6} lg={6} xl={4} sm={12}>
                  <div className="card "    >
                    <div className="card-image-container">
                      <img
                        className="card-image"
                        src={(stamps.stampImages[index]).replace(/^/, 'data:image/png;base64,')}
                        alt={item.image_name}
                      />
                      <Link
                        onClick={() =>
                        {
                          var tempData = item
                          tempData["stampImages"] = stamps.stampImages[index]
                          localStorage.setItem("singleStamp", JSON.stringify(item))
                        }
                        }
                        to={"/addstamps"}
                      >
                        <span className="badge">{" Edit  "}</span>
                      </Link>
                    </div>
                    <div className="card-text">
                      <span className="date">Year :  {item.stamp_year} </span>
                      <h2>{item.stamp_title}</h2>
                      <h2>{item.stamp_country}</h2>
                      <p>{item.stamp_info}</p>
                      <span className="adderss-text mb-4">Stamp Number  :  {item.stamp_number}</span><br />
                      <span className="  ">Catalog Year  :  {item.catalog_year}</span><br />
                      <span className="   ">Price:  {item.catalog_price}</span><br />
                      <span className="  ">Scott Number  :  {item.catalog_scott_number}</span><br />
                      <span className="   ">Verient Number :  {item.catalog_verient_number}</span><br />
                      <span className="    ">Face Value  :  {item.stamp_face_value}</span>
                    </div>

                    <div className="card-stats">
                      <div className="stat   ">
                        <div className="value">Catalog A Name</div>
                        <div className="type">{item.catalog_name}</div>
                      </div>
                      <div className="stat state-border ">
                        <div className="value">Catalog A Name #</div>
                        <div className="type">{item.catalog_number}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              )) : ""}
          </Row>
        </Container>
      </form>
    </Container>
  );
};

export default AllStamps;