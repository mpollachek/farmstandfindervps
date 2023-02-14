import {
  Button as RSButton,
  Container,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  List,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../css/Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from "@fortawesome/free-solid-svg-icons"; // dairy
import { faPepperHot } from "@fortawesome/free-solid-svg-icons"; // produce
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"; // meat
import { faEgg } from "@fortawesome/free-solid-svg-icons"; // eggs
import { faTents } from "@fortawesome/free-solid-svg-icons"; // farmers market
import { faChildren } from "@fortawesome/free-solid-svg-icons"; // Play Area
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons"; // therapy
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; // garden center
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

/* NOTE TO SELF: NEXT STEP IS ENSURING FILTER STATE IS PASSED TO SERVER AND NOT SELECTING ANY PRODUCTS MEANS ALL PRODUCTS.  ALSO CLEAR INPUT FIELD WHEN ADDING PRODUCT. NEED TO CHECK IF STATE STAYS WHEN CLOSING AND REOPENING SIDEBAR. */

// const Sidebar = ({
//   sidebarProducts,
//   setSidebarProducts,
//   sidebarSeasons,
//   setSidebarSeasons,
//   sidebarSearch,
//   setSidebarSearch,
// }) => {

//   let products = sidebarProducts;
//   let seasons = sidebarSeasons;
//   let search = sidebarSearch;

const Sidebar = ({
  setSidebarProducts,
  setSidebarSeasons,
  setSidebarSearch,
  sidebarSeasons,
  sidebarProducts,
  sidebarTypes,
  setSidebarTypes,
  sidebarProductSearch,
  setSidebarProductSearch,
  setRunGet,
  runGet,
  toggleOffcanvas,
}) => {
  const [tempArray, setTempArray] = useState(sidebarProducts);
  const [yearRoundSeasonsState, setYearRoundSeasonsState] = useState(true);
  const [harvestSeasonsState, setHarvestSeasonsState] = useState(false);
  const [allProductsSearch, setAllProductsSearch] = useState(true);
  const [orProductsSearch, setOrProductsSearch] = useState(false)
  const [productsInput, setProductsInput] = useState("");
  const [farmstandType, setFarmstandType] = useState(sidebarTypes)
  const [allProducts, setAllProducts] = useState([]);
  const [runGetProducts, setRunGetProducts] = useState(true);

  //collapse states
  const [typesIsOpen, setTypesIsOpen] = useState(false);
  const [seasonsIsOpen, setSeasonsIsOpen] = useState(false);
  const [productsIsOpen, setProductsIsOpen] = useState(false);
  const toggleTypes = () => setTypesIsOpen(!typesIsOpen);
  const toggleSeasons = () => setSeasonsIsOpen(!seasonsIsOpen);
  const toggleProducts = () => setProductsIsOpen(!productsIsOpen);

  const initialValues = {
    search: "",
    productsCheckbox: sidebarProducts,
    farmstandType: sidebarTypes
  };

  console.log("initialValues: ", initialValues);
  console.log("initialValues sidebarProducts: ", sidebarProducts);
  console.log("initialValues sidebarProducts: ", typeof sidebarProducts);

  const getAllProducts = async () => {
    if (runGetProducts) {
    let allPostedProducts = await axios.get(`http://localhost:8080/api/farms/getallproducts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("allPostedProducts: ", allPostedProducts)
    setAllProducts(allPostedProducts.data);
    setRunGetProducts(false);
  }}

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleSubmit = (values) => {
    if (!yearRoundSeasonsState) {
      setSidebarSeasons("harvest");
    } else {
      setSidebarSeasons("yearRound");
    }
    if (!allProductsSearch) {
      setSidebarProductSearch("or");
    } else {
      setSidebarProductSearch("all");
    }
    setSidebarProducts(values.productsCheckbox);
    setSidebarTypes(values.farmstandType)    
    console.log("for submit, values: ", values)
    console.log("for submit, sidebarSeasons: ", sidebarSeasons);
    console.log("for submit, sidebarProducts: ", sidebarProducts);
    console.log("for submit, sidebarProducts: ", typeof sidebarProducts);
    console.log("for submit, sidebarTypes: ", sidebarTypes)
    setRunGet(true);
    console.log("runget: ", runGet);
    toggleOffcanvas();
  };

  useEffect(() => {
    if (sidebarSeasons === "harvest") {
      setHarvestSeasonsState(true);
      setYearRoundSeasonsState(false);
    }
  }, []);

  useEffect(() => {
    if (sidebarProductSearch === "or") {
      setOrProductsSearch(true);
      setAllProductsSearch(false);
    }
  }, []);

  const resetFiltersSubmit = () => {
    setSidebarProducts([]);
    setTempArray([]);
    setSidebarSeasons("yearRound")
    setSidebarTypes([])
    setSidebarSearch("")
    setAllProductsSearch(true);
    setOrProductsSearch(false);
  }


  return (
    /* 
          mileage slider 
          products list (add to list)
          seasons open (checkboxes)
         */

    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //validate={validateCreateListingForm}
    >
      <Form>
      <Row className="my-3">
        <RSButton color="primary" onClick={toggleTypes} style={{ marginBottom: '1rem' }}>
        Farmstand Types{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </RSButton>
      <Collapse isOpen={typesIsOpen}>
        <Card>        
      <FormGroup row check >
      <CardHeader>
        <h6 style={{fontWeight: 'bold'}} className='text-center'>
        Farmstand Types/Services
        </h6>
        </CardHeader>
        <CardBody>
          <Col > 
            <Label check xs={6}>
              <Field type='checkbox' name="farmstandType" value='produce' />
              {" "} Produce {" "}
              <span style={{fontSize: '1.25em', color: 'red'}} >
              <FontAwesomeIcon icon={faPepperHot} />
              </span>
            </Label>          
            <Label check xs={6}>
              <Field type='checkbox' name="farmstandType" value='meat' />
              {" "} Meat {" "}
              <span style={{fontSize: '1.25em', color: 'brown'}} >
              <FontAwesomeIcon icon={faDrumstickBite} />
              </span>
            </Label>          
            <Label check  xs={6}>
              <Field type='checkbox' name="farmstandType" value='dairy' />
              {" "} Dairy {" "}
              <span style={{fontSize: '1.25em', color: 'black'}} >
              <FontAwesomeIcon icon={faCow} />
              </span>
            </Label>
            <Label check  xs={6}>
              <Field type='checkbox' name="farmstandType" value='eggs' />
              {" "} Eggs {" "}
              <span style={{fontSize: '1.25em', color: '#66a1ed'}} >
              <FontAwesomeIcon icon={faEgg} />
              </span>
            </Label>
            <Label check  xs={6}>
              <Field type='checkbox' name="farmstandType" value='farmersMarket' />{" "} Farmers Market {" "}
              <span style={{fontSize: '1.25em', color: '#853e00'}} >
              <FontAwesomeIcon icon={faTents} />
              </span>
            </Label>
            <Label check xs={6}>
              <Field type='checkbox' name="farmstandType" value='gardenCenter' />{" "} Garden Center {" "}
              <span style={{fontSize: '1.25em', color: '#098200'}} >
              <FontAwesomeIcon icon={faSeedling} />
              </span>
            </Label>
            <Label check xs={6}>
              <Field type='checkbox' name="farmstandType" value='playArea' />{" "} Play Area {" "}
              <span style={{fontSize: '1.25em', color: '#20b2bd'}} >
              <FontAwesomeIcon icon={faChildren} />
              </span>
            </Label>
            <Label check xs={6}>
              <Field type='checkbox' name="farmstandType" value='therapy' />{" "} Therapy {" "}
              <span style={{fontSize: '1.25em', color: '#800915'}} >
              <FontAwesomeIcon icon={faUserDoctor} />
              </span>
            </Label>
          </Col>
          </CardBody>
        </FormGroup>
        </Card>
        </Collapse>
      </Row>

        <Row className="my-3">
        <RSButton color="primary" onClick={toggleSeasons} style={{ marginBottom: '1rem' }}>
        Seasons Open{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </RSButton>
      <Collapse isOpen={seasonsIsOpen}>
        <Card>
          <CardHeader>
          <h6><strong>Selecting "open seasonally" includes locations open year round</strong></h6>
          </CardHeader>
          <CardBody>
        <FormGroup tag="fieldset">
          <FormGroup row check>
            <Col>              
              <Input
                name="seasonsRadio"
                type="radio"
                id="harvestRadio"
                checked={harvestSeasonsState}
                onChange={() => {
                  setHarvestSeasonsState(true);
                  setYearRoundSeasonsState(false);
                }}
              />
              <Label check>Open Seasonally (late spring, summer, early Fall)</Label>
            </Col>
          </FormGroup>
          <FormGroup row check default>
            <Col>
              <Input
                name="seasonsRadio"
                type="radio"
                id="yearRoundRadio"
                checked={yearRoundSeasonsState}
                onChange={() => {
                  setYearRoundSeasonsState(true);
                  setHarvestSeasonsState(false);
                }}
              />
              <Label check>Open Year Round</Label>
            </Col>            
          </FormGroup>          
        </FormGroup>       
        </CardBody>
        </Card>
        </Collapse> 
        </Row>

        
        <Row className="my-3">
        <RSButton color="primary" onClick={toggleProducts} style={{ marginBottom: '1rem' }}>
        Products{"  "}<FontAwesomeIcon icon={faCaretDown} color='white'/>
      </RSButton>
      <Collapse isOpen={productsIsOpen}>
        <Card>   
          <CardHeader>
          <h6><strong>Filter farmstand by products For Sale</strong></h6>
          </CardHeader>
          <CardBody>
        <FormGroup tag="fieldset">
          <FormGroup row check>
            <Col>              
              <Input
                name="searchProductsRadio"
                type="radio"
                id="allProductsRadio"
                checked={allProductsSearch}
                onChange={() => {
                  setAllProductsSearch(true);
                  setOrProductsSearch(false);
                }}
              />
              <Label check>search location containing all products listed below</Label>
            </Col>
          </FormGroup>
          <FormGroup row check default>
            <Col>
              <Input
                name="searchProductsRadio"
                type="radio"
                id="orProductsRadio"
                checked={orProductsSearch}
                onChange={() => {
                  setAllProductsSearch(false);
                  setOrProductsSearch(true);
                }}
              />
              <Label check>search location containing any product listed below</Label>
            </Col>
          </FormGroup>
        </FormGroup>

        <FormGroup row className="form-control">
          <Col>
            {/* Map checkboxes of all products */}
            {allProducts.map((item, index) => {
              return(
              <Label check xs={12}>
              <Field type='checkbox' name="productsCheckbox" value={item} key={index} />
              {" "} {item} {" "}
            </Label>
              )})            
            }



          </Col>
        </FormGroup>
        </CardBody>
        </Card>
        </Collapse>
        </Row>

        <Row className="my-3">
        <FormGroup row>
          <Col className="text-center">
            <RSButton type="submit" color="primary" className="mx-2">
              Search with Filters
            </RSButton>
            <RSButton onClick={() => resetFiltersSubmit()} color="danger" className="mx-2">
              Reset Filters
            </RSButton>
          </Col>
        </FormGroup>
        </Row>
      </Form>
    </Formik>
  );
};

export default Sidebar;
