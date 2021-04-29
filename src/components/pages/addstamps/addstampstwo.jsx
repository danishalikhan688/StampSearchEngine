import React, { useState, useEffect, useContext } from "react";
import Context from "../../../context/Context"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import StampModel from "../../../models/stamp"
import Row from 'react-bootstrap/Row'
import "./assets/addstamp.css"
import { Formik, Field } from "formik";
import * as Yup from "yup";
import DragDropImage from "../../basicComponents/draganddropimage";
import { validateArrayObject, validateObject } from "../../../helpers/validation/form-validation";
import { object } from "yup";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  year: Yup.number().required("Required"),
  stampNumber: Yup.string().required("Required"),
  faceValue: Yup.string().required("Required"),
  info: Yup.string().required("Required"),
  catalogName: Yup.string().required("Required"),
  catalogNumber: Yup.string().required("Required"),
  catalogYear: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  scottNumber: Yup.string().required("Required"),
  verientNumber: Yup.string().required("Required"),
});

const AddStamptwo = () => {
  const { setStamps } = useContext(Context);
  const [detailStamp, setDetailStamp] = useState(StampModel);
  const [EditType, setEditType] = useState("create");
  const [fileData, setFileData] = useState({});
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

  var tempUploadFile = {}
  const handleUpload = (files, fieldName) => {
    tempUploadFile[fieldName] = files
    setFileData(tempUploadFile)
  }

  const onSubmit = async (values) => {
    if (validateObject(values) && Object.keys(fileData).length === 3) {
      var apiData = { ...values, ...fileData }
      alert("Your Post Method Data is here ")
      alert(JSON.stringify(apiData))
    }
    else {
      alert("Please fill all the fields and upload images")
    }

  };
  return (
    <Container fluid>

      <Formik
        className="maxWidth"
        onSubmit={(values) => onSubmit(values)}
        initialValues={{
          title: "",
          country: "",
          year: 1900,
          stampNumber: "",
          faceValue: "",
          info: "",
          catalogName: "",
          catalogNumber: "",
          catalogYear: 1900,
          price: "",
          scottNumber: "",
          verientNumber: "",
        }}
        validationSchema={formSchema}
      >
        {({ values, errors, touched }) => (
          <form
            className="w-100 "
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(values);
            }}
          >
            <Row className="pt-3">
              <Col lg={12}>
                <ol className="breadcrumb mb-4 d-flex justify-content-center">
                  <h1 className="breadcrumb-item text-center active ">{EditType === "create" ? "Add Stamp" : "Edit Stamp"}</h1>
                </ol>
              </Col>
              <Col md={12} sm={12} lg={12}>
                <label className="small form-label main-label  mb-1" for="inputFirstName">  Add Stamp </label>
              </Col>
              <Col lg={12}>
                <Row className="justify-content-center;">
                  <Col md={12} sm={12} lg={6}>
                    <Row className="justify-content-center ">
                      <Col className="mt-3" md={12} sm={12} md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Title</label>
                          <Field name="title" type="text" placeholder="Enter Title" id="name" className={`form-control py-4 ${errors.title && touched.title && "is-invalid"}`} />
                          {errors.title && touched.title ? <div className="text-danger">{errors.title}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Country</label>
                          <Field name="country" type="text" placeholder="Enter country" id="country" className={`form-control py-4 ${errors.country && touched.country && "is-invalid"}`} />
                          {errors.country && touched.country ? <div className="text-danger">{errors.country}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Year</label>
                          <Field name="year" type="number" placeholder="Enter year" id="year" className={`form-control py-4 ${errors.year && touched.year && "is-invalid"}`} />
                          {errors.year && touched.year ? <div className="text-danger">{errors.year}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">    Stamp Number</label>
                          <Field name="stampNumber" type="text" placeholder="Enter Stamp Number" id="stampNumber" className={`form-control py-4 ${errors.stampNumber && touched.stampNumber && "is-invalid"}`} />
                          {errors.stampNumber && touched.stampNumber ? <div className="text-danger">{errors.stampNumber}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Face Value</label>
                          <Field name="faceValue" type="text" placeholder="Enter Face Value" id="faceValue" className={`form-control py-4 ${errors.faceValue && touched.faceValue && "is-invalid"}`} />
                          {errors.faceValue && touched.faceValue ? <div className="text-danger">{errors.faceValue}</div> : null}
                        </div>
                      </Col>

                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Info  </label>
                          <Field name="info" type="text" placeholder="Enter Info" id="info" className={`form-control py-4 ${errors.info && touched.info && "is-invalid"}`} />
                          {errors.info && touched.info ? <div className="text-danger">{errors.info}</div> : null}
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col md={12} sm={12} lg={6}>
                    <Row className="justify-content-center ">

                      <Col className="mt-3" md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="CleanImage">  Clean Image Your Stamp</label>
                          <DragDropImage handleUpload={handleUpload} fieldName={"uploadCleanStampImage"} />
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="canceledImage">  Canceled Image Your Stamp</label>
                          <DragDropImage handleUpload={handleUpload} fieldName={"uploadCancelStampImage"} />
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="variationImage">     Variation Image Your Stamp</label>
                          <DragDropImage handleUpload={handleUpload} fieldName={"uploadVariationStampImage"} />
                        </div>
                      </Col>

                    </Row>
                  </Col>

                </Row>
              </Col>

              <Col lg={12}>
                <Row className="justify-content-center;">
                  <Col md={12} sm={12} lg={12}>
                    <label className="small form-label main-label  mb-1" for="inputFirstName">  Catalog Name</label>
                  </Col>
                  <Col md={12} sm={12} lg={6}>
                    <Row className="justify-content-center ">
                      <Col className="mt-3" md={12} sm={12} md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Name</label>
                          <Field name="catalogName" type="text" placeholder="Enter Catalog Name" id="catalogName" className={`form-control py-4 ${errors.catalogName && touched.catalogName && "is-invalid"}`} />
                          {errors.catalogName && touched.catalogName ? <div className="text-danger">{errors.catalogName}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Number</label>
                          <Field name="catalogNumber" type="text" placeholder="Enter Catalog Number" id="catalogNumber" className={`form-control py-4 ${errors.catalogNumber && touched.catalogNumber && "is-invalid"}`} />
                          {errors.catalogNumber && touched.catalogNumber ? <div className="text-danger">{errors.catalogNumber}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Year</label>
                          <Field name="catalogYear" type="number" placeholder="Enter Year" id="catalogYear" className={`form-control py-4 ${errors.catalogYear && touched.catalogYear && "is-invalid"}`} />
                          {errors.catalogYear && touched.catalogYear ? <div className="text-danger">{errors.catalogYear}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">    Price  </label>
                          <Field name="price" type="number" placeholder="Enter Price" id="catalogYear" className={`form-control py-4 ${errors.price && touched.price && "is-invalid"}`} />
                          {errors.price && touched.price ? <div className="text-danger">{errors.price}</div> : null}
                        </div>
                      </Col>
                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">     Scott Number</label>
                          <Field name="scottNumber" type="text" placeholder="Enter Scott Number" id="scottNumber" className={`form-control py-4 ${errors.scottNumber && touched.scottNumber && "is-invalid"}`} />
                          {errors.scottNumber && touched.scottNumber ? <div className="text-danger">{errors.scottNumber}</div> : null}
                        </div>
                      </Col>

                      <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                          <label className="small form-label  mb-1" for="inputFirstName">  Verient Number </label>
                          <Field name="verientNumber" type="text" placeholder="Enter  Verient Number" id="catalogYear" className={`form-control py-4 ${errors.verientNumber && touched.verientNumber && "is-invalid"}`} />
                          {errors.verientNumber && touched.verientNumber ? <div className="text-danger">{errors.verientNumber}</div> : null}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>


              <Col lg={12}>
                <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                  <button className="btn btn-primary auth-login-btn" style={{ padding: "11px 67px", flex: "unset", width: "unset", borderRadius: "6px" }}  > Submit </button>
                </div>
              </Col>
            </Row>
          </form>
        )}
      </Formik>




      {/* <form  > */}

      {/* </form> */}

    </Container>

  );
};
export default AddStamptwo;

