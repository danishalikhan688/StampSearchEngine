import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"
import "./style.css"
import { globalVars } from '../../../util/common';
import { useHistory } from "react-router";
import ImageDragAndDrop from "../../basicComponents/ImageDragAndDrop";
import Spinner from 'react-bootstrap/Spinner'

const Index = () => {
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const history = useHistory();

  const [stamps, setStamps] = useState([

    {
      "info":
        [
          {
            "catalog_name": "s1",
            "catalog_number": "s1",
            "catalog_price": 1.0,
            "catalog_scott_number": "s",
            "catalog_verient_number": "s",
            "catalog_year": 1900,
            "image_name": "IMG-20191208-WA0034.jpg",
            "image_type": "uploadCleanStampImage",
            "stamp_country": "s",
            "stamp_face_value": "s",
            "stamp_title": "TITLE1",
            "stamp_info": "s",
            "stamp_number": "s",
            "stamp_year": 1900
          },
          {
            "catalog_name": "s2",
            "catalog_number": "s2",
            "catalog_price": 1.0,
            "catalog_scott_number": "s",
            "catalog_verient_number": "s",
            "catalog_year": 1900,
            "image_name": "IMG-20191208-WA0034.jpg",
            "image_type": "uploadCleanStampImage",
            "stamp_country": "s",
            "stamp_face_value": "s",
            "stamp_title": "TITLE2",
            "stamp_info": "s",
            "stamp_number": "s",
            "stamp_year": 1900
          }
        ], "stampImages": ["/9j/4AAQSkZJRgABAQAAAQABAAD/  llJXrZPg/ruIp0P+fhwYzGfVaMqvY//9k=", "./assets/img/2.jpg"]
    }


  ])
  var tempUploadFile = {}

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

  const onSubmit = async (values) => {
    setLoading(true)

    const formData = new FormData();
    formData.append("myFile", fileData.file)
    formData.append("filename", fileData.file.name)

    var response = await fetch(globalVars.urls.baseURL + '/searchStamp', {
      method: 'post',
      body: formData,
    })

    var data = await response.json()
    if (data.return === 'nothing to search') {
      alert("No similar images found!")
      setLoading(false)
    }
    else {
      console.log(typeof (data))
      setStamps(data)
      setShowResult(true)
      setLoading(false)
    }
  };

  var tempUploadFile = {}

  const handleUpload = (file, fieldName) => {
    tempUploadFile['file'] = file
    tempUploadFile['filename'] = file.name
    tempUploadFile['fieldName'] = fieldName
    setFileData(tempUploadFile)
    tempUploadFile = {}
  }

  return (
    <Container fluid >
      <Row className=" pt-2 ">
        <Col lg={12}>
          <ol className="breadcrumb mb-4 d-flex justify-content-center">
            <h1 className="breadcrumb-item text-center active ">Search Engine</h1>
          </ol>
        </Col>
        <Col className="d-flex" lg={12}>
          <div style={{ width: "85%", padding: "0px 12px" }}>

            <ImageDragAndDrop style={{ width: "80%" }} handleUpload={handleUpload} fieldName={"searchedStamp"} />
          </div>
          <div onClick={onSubmit} className="btn-search">
            <i className="fa fa-search"></i>
          </div>
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
                    src={(stamps.searchImages[index]).replace(/^/, 'data:image/png;base64,')}
                    alt={item.image_name}
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
                  <span className="date">Year :  {item.stamp_year} </span>
                  <h2>{item.stamp_title}</h2>
                  <h2>{item.stamp_country}</h2>
                  <p>{item.stamp_info}</p>
                  <span className="adderss-text mb-4">Stamp Number  :  {item.stamp_number}</span><br />
                  <span className="  ">Catalog Year  :  {item.catalog_year}</span><br />
                  <span className="   ">Price:  {item.catalog_price}</span><br />
                  <span className="  ">Scott Number  :  {item.catalog_scott_number}</span><br />
                  <span className="   ">Verien tNumber :  {item.catalog_verient_number}</span><br />
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
  );
};

export default Index;

