{/* <Row className="pt-3">
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
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.title} placeholder="Enter Title" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Country</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.country} placeholder="Enter Country" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Year</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="number" value={detailStamp?.year} placeholder="Enter Year" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">    Stamp Number</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.stampNumber} placeholder="Enter Stamp Number" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Face Value</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.faceValue} placeholder="Enter Face Value" />
                        </div>
                    </Col>

                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Info  </label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.info} placeholder="Enter Info" />
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
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.catalogName} placeholder="Enter Name" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Number</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="text" value={detailStamp?.catalogNumber} placeholder="Enter Number" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Year</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="number" value={detailStamp?.catalogYear} placeholder="Enter Year" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">    Price  </label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="number" value={detailStamp?.price} placeholder="Enter Price" />
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">     Scott Number</label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="number" value={detailStamp?.scottNumber} placeholder="Enter Scott Number" />
                        </div>
                    </Col>

                    <Col md={12} sm={12} lg={9}>
                        <div className="form-group">
                            <label className="small form-label  mb-1" for="inputFirstName">  Verient Number </label>
                            <input className="form-control py-4  " id="inputEmailAddress" type="number" value={detailStamp?.verientNumber} placeholder="Enter Verient Number " />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Col>


    {/* <Col lg={12}>
          <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
            <a onClick={handleSubmit} className="btn btn-primary auth-login-btn" style={{ padding: "11px 67px", flex: "unset", width: "unset", borderRadius: "6px" }}  > Submit </a>
          </div>
        </Col> */}
</Row > * /}