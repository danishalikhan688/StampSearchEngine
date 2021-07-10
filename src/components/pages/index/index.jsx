import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"
import DragDropImage from "../../basicComponents/draganddropimage";
import "./style.css"
import { globalVars } from '../../../util/common';
import { useHistory } from "react-router";
import ImageDragAndDrop from "../../basicComponents/ImageDragAndDrop";

const Index = () => {
  const [fileData, setFileData] = useState({});
  // const [formData, setFormData] = useState({});
  const [showResult, setShowResult] = useState(false);
  const history = useHistory();
  const [stamps, setStamps] = useState([
    {
      image: "./assets/img/1.jpg",
      year: "1900",
      country: "Pakistan",
      numberInternal: "Xy769",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
      catalogAName: "Yvert",
      catalogANumber: "123",
    },
    {
      image: "./assets/img/2.jpg",
      year: "1903",
      country: "France",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
      catalogAName: "Yvert",
      numberInternal: "Uy769",
      catalogANumber: "321",
    },
    {
      image: "./assets/img/1.jpg",
      year: "1934",
      country: "Germany",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
      catalogAName: "Yvert",
      numberInternal: "Py769",
      catalogANumber: "234",
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
    alert(JSON.stringify(fileData))
    const formData = new FormData();
    formData.append("myFile", fileData.file)
    formData.append("filename", fileData.file.name)
    formData.append("fieldName", fileData.fieldName)
    // formData.append("title", values['title'])

    // console.log(formData)

    var response = await fetch(globalVars.urls.baseURL + '/searchStamp', {
      method: 'post',
      body: formData,
    })

    var data = await response.json()
    const images = data.searchImages
    const info = data.info
    console.log(info)
    console.log(images)

    //  var response = await fetch(globalVars.urls.baseURL + '/addStampFile', {
    //   method: 'post',
    //   body: formData,
    // })

    // var data = await response.json()
    // if (data.return === 'stamp added') {
    //   alert("Stamp Added!")
    // }
    setShowResult(true)

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
            <h1 className="breadcrumb-item text-center active ">  Search Engine</h1>
          </ol>
        </Col>
        {/* className="pt-3 pb-5 " */}
        <Col className="d-flex" lg={12}>
          <div style={{ width: "85%" }}>

            <ImageDragAndDrop style={{ width: "80%" }} handleUpload={handleUpload} fieldName={"searchedStamp"} />
            {/* <DragDropImage style={{width:"80%"}} handleUpload={handleUpload}   fieldName={"searchedStamp"} />  */}
          </div>
          <div onClick={onSubmit} className="btn-search">
            <i className="fa fa-search"></i>
          </div>
        </Col>
        {showResult ? stamps.map((item, index) => (
          <Col className="mt-5" key={Math.random()} md={6} lg={6} xl={4} sm={12}>
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
                <h2>{item.country}</h2>
                <p>{item.info}</p>
                <span className="adderss-text mb-4">Internal Number  :  {item.numberInternal}</span>
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
        )) : ""}
      </Row>
    </Container>


  );
};
export default Index;

