import React, {useState} from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Link} from "react-router-dom"
import   "./assets/allstamps.css"
const AllStamps = () => {
  const [stamps, setStamps] = useState([
    {image:"./assets/img/1.jpg",
    year:"1900",
    country:"Pakistan",
    numberInternal:"Xy769",
    info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
    catalogAName:"Yvert",
    catalogANumber:"123",
  },
  {
    image:"./assets/img/2.jpg",
    year:"1903",
    country:"France",
    info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
    catalogAName:"Yvert",
    numberInternal:"Uy769",
    catalogANumber:"321",
  },
  {image:"./assets/img/1.jpg",
    year:"1934",
    country:"Germany",
    info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea quam, porro deserunt, cupiditate quibusdam ullam dolore assumenda quas vel vitae exercitationem! Dignissimos nihil quos porro consequuntur, ullam beatae? Beatae?",
    catalogAName:"Yvert",
    numberInternal:"Py769",
    catalogANumber:"234",
  }
  ]) 
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
            <Col  key={Math.random()}  md={6} lg={6} xl={4} sm={12}> 
               <div  className=  "card "    >
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
            ))}
             </Row>
        </Container>
      </form>

    </Container>

  );
};
export default AllStamps;

