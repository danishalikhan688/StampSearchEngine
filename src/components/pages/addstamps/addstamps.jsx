import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import StampModel from "../../../models/stamp"
import Row from 'react-bootstrap/Row'
import "./assets/addstamp.css"
import { useHistory } from "react-router";
import { globalVars } from '../../../util/common';

const AddStamps = () => {
  const [detailStamp, setDetailStamp] = useState({});
  const [EditType, setEditType] = useState("create");
  const history = useHistory();

  useEffect(() => {
    (localStorage.getItem("singleStamp") === undefined ||
      localStorage.getItem("singleStamp") === "undefined" ||
      localStorage.getItem("singleStamp") === null)
      ? setDetailStamp(StampModel)
      : handleBeforeLoad();
  }, [])

  const handleBeforeLoad = () => {
    setDetailStamp(JSON.parse(localStorage.getItem("singleStamp")))
    setEditType("edit")
  }

  const handleChange = (e) => {
    setDetailStamp(
      {
        ...detailStamp,
        [e.target.name]: e.target.value
      }
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    var response = await fetch(globalVars.urls.baseURL + '/updateStamp', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(detailStamp),
    })

    history.push('/allstamps')
  };

  return (
    <Container fluid>
      <form onSubmit={onSubmit} >
        <Container fluid>
          <Row className="add-stamp-box ">
            <Col lg={12}>
              <ol className="breadcrumb mb-4 d-flex justify-content-center">
                <h1 className="breadcrumb-item text-center active "> Edit Stamp </h1>
              </ol>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">  Stamp  Title  </label>
                <input className="form-control py-4  auth-input" id="inputEmailAddress" type="text" name="stamp_title" onChange={handleChange} value={detailStamp.stamp_title} placeholder="Enter Title" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName"> Stamp    Country   </label>
                <input className="form-control py-4  auth-input" id="inputEmailAddress" type="text" name="stamp_country" onChange={handleChange} value={detailStamp.stamp_country} placeholder="Enter country" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Stamp Number   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" name="stamp_number" onChange={handleChange} onChange={handleChange} value={detailStamp.stamp_number} type="text" placeholder="Enter Number" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Stamp Year    </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="number" name="stamp_year" onChange={handleChange} value={detailStamp.stamp_year} placeholder="Enter Stamp Year" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Stamp Face Value   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" name="stamp_face_value" onChange={handleChange} value={detailStamp.stamp_face_value} placeholder="Enter Stamp Face Value" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Name    </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" name="catalog_name" onChange={handleChange} value={detailStamp.catalog_name} placeholder="Enter Catalog Name " />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Number   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" name="catalog_number" onChange={handleChange} value={detailStamp.catalog_number} placeholder="Enter Catalog Number" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Price   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="number" name="catalog_price" onChange={handleChange} value={detailStamp.catalog_price} placeholder="Enter Catalog Price" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Scott Number   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" name="catalog_scott_number" onChange={handleChange} value={detailStamp.catalog_scott_number} placeholder="Enter Catalog Scott Number" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Verient Number   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" name="catalog_verient_number" onChange={handleChange} value={detailStamp.catalog_verient_number} placeholder="Enter Catalog Verient Number" />
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Catalog Year   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" type="number" name="catalog_year" onChange={handleChange} value={detailStamp.catalog_year} placeholder="Enter Catalog Year" />
              </div>
            </Col>

            <Col lg={12}>
              <div className="form-group">
                <label className="small form-label  mb-1" for="inputFirstName">     Other Info   </label>
                <input className="form-control py-4  auth-input" id="inputPassword" name="stamp_info" onChange={handleChange} value={detailStamp.stamp_info} type="textarea" placeholder="Enter Other Info" />
              </div>
            </Col>

            <Col lg={12}>
              <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                <button className="btn btn-primary auth-login-btn" style={{ padding: "11px 67px", flex: "unset", width: "unset", borderRadius: "6px" }}  > Update </button>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </Container>
  );
};

export default AddStamps;

