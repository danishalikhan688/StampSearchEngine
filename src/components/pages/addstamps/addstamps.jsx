import React ,{useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import StampModel from "../../../models/stamp"
import Row from 'react-bootstrap/Row'
import   "./assets/addstamp.css"
const AddStamps = () => { 
  const [detailStamp, setDetailStamp] = useState(StampModel); 
  const [EditType, setEditType] = useState("create");
  useEffect(() => { 
   ( localStorage.getItem("singleStamp") === undefined ||
    localStorage.getItem("singleStamp") === "undefined" ||
    localStorage.getItem("singleStamp") === null)
      ? setDetailStamp(StampModel)
      :  handleBeforeLoad(); 
  }, [])
  const handleBeforeLoad = () =>{
    setDetailStamp(JSON.parse(localStorage.getItem("singleStamp")))  
     setEditType("edit")
  }
  return (
    <Container fluid>
      <form  >
        <Container   fluid>
          <Row className="add-stamp-box ">
            <Col lg={12}>
              <ol className="breadcrumb mb-4 d-flex justify-content-center">
                <h1 className="breadcrumb-item text-center active ">{EditType==="create"?"Add Stamp":"Edit Stamp"}</h1>
              </ol>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputEmailAddress" type="number" value={detailStamp.year} placeholder="Enter Year" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword"  value={detailStamp.country} type="text" placeholder="Enter country" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword" type="text"  value={detailStamp.numberInternal} placeholder="Enter Number(Internal)" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword" type="text"  value={detailStamp.catalogAName} placeholder="Enter Catalog Name A" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword" type="number"  value={detailStamp.catalogANumber} placeholder="Enter Catalog Number" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword" type="text" placeholder="Enter Catalog Name B" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword" type="number" placeholder="Enter Catalog Number" />
              </div>
            </Col> <Col lg={6}> 
                <input className="   py-4   " id="inputPassword" type="file"   placeholder="Choose file" />
              
            </Col>
            <Col lg={12}>
              <div className="form-group">
                <input className="form-control py-4  auth-input" id="inputPassword"  value={detailStamp.info} type="textarea" placeholder="Enter   Other Info" />
              </div> 
            </Col>
           
            <Col lg={12}>
            <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
              <a href="/" className="btn btn-primary auth-login-btn" style={{    padding: "11px 67px", flex:"unset", width:"unset" ,     borderRadius: "6px"}}  > Submit </a>
            </div> 
            </Col>
          </Row>
        </Container>
      </form>

    </Container>

  );
};
export default AddStamps;

