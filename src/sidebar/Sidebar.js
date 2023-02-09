import {
  Button as RSButton,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  List,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState, useEffect, useMemo } from "react";
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

  const initialValues = {
    search: "",
    tempArray: sidebarProducts,
    farmstandType: sidebarTypes
  };

  console.log("initialValues: ", initialValues);
  console.log("initialValues sidebarProducts: ", sidebarProducts);
  console.log("initialValues sidebarProducts: ", typeof sidebarProducts);

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
    setSidebarProducts(tempArray);
    setSidebarTypes(values.farmstandType)    
    console.log("for submit, values: ", values)
    console.log("for submit, sidebarSeasons: ", sidebarSeasons);
    console.log("for submit, sidebarProducts: ", sidebarProducts);
    console.log("for submit, sidebarProducts: ", typeof sidebarProducts);
    console.log("for submit, tempArray: ", tempArray);
    console.log("for submit, tempArray: ", typeof tempArray);
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
      <FormGroup row check >
        <h6 style={{fontWeight: 'bold'}} className='text-center'>
        Farmstand Types/Services
        </h6>
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
        </FormGroup>
      </Row>

        <Row className="my-3">
        <FormGroup tag="fieldset">
          <FormGroup row check>
            <Col>
              <h6><strong>Selecting "open seasonally" includes locations open year round</strong></h6>
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
        </Row>

        
        <Row className="my-3">
        <FormGroup tag="fieldset">
          <FormGroup row check>
            <Col>
              <h6><strong>Filter farmstand by products For Sale</strong></h6>
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
            <FieldArray name="tempArray">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                console.log("form: ", form);
                const { values } = form;
                const { tempArray } = values;
                return (
                  <div>
                    <Field name="newProduct" placeholder="product for sale" />

                    <button
                      type="button"
                      onClick={() => {
                        console.log("values: ", values);
                        if (values.newProduct) {
                          tempArray.push(values.newProduct);
                          setTempArray([...tempArray]);
                          setSidebarProducts(tempArray);
                          console.log("tempArray: ", tempArray);
                          console.log("values: ", values);
                          form.setFieldValue("newProduct", "");
                        }
                      }}
                    >
                      {" "}
                      Add Product{" "}
                    </button>

                    {tempArray.map((product, index) => {
                      return (
                        <div key={index} value={product}>
                          {console.log("return tempArray product: ", product)}

                          <List type="unstyled">
                            {/* {`${products[index]}`}      */}
                            <p>
                              {product}{" "}
                              {index >= 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    console.log(
                                      "remove item: ",
                                      tempArray[index]
                                    );
                                    //remove(index);
                                    tempArray.splice(index, 1);
                                    setTempArray([...tempArray]);
                                    console.log(
                                      "tempArray before setSidebarProducts: ",
                                      tempArray
                                    );
                                    console.log("index to remove: ", index);
                                    setSidebarProducts(tempArray);
                                  }}
                                >
                                  {" "}
                                  <strong>X</strong>{" "}
                                </button>
                              )}
                            </p>
                          </List>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
          </Col>
        </FormGroup>
        </Row>

        <Row className="my-3">
        <FormGroup row>
          <Col className="text-center">
            <RSButton type="submit" color="primary">
              Search with Filters
            </RSButton>
          </Col>
        </FormGroup>
        </Row>
      </Form>
    </Formik>
  );
};

export default Sidebar;
